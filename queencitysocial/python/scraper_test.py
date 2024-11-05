# IMPORTS
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time

DRIVER_PATH = 'C:/Users/Jenna/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe'

# CONFIGURE CHROME OPTIONS
try:
    options = Options()
    options.headless = True  # Headless mode
    options.add_argument('--window-size=1920,1200')
except Exception as e:
    print(f"Error in configuring Chromedriver options: {e}")

# Set up Chrome driver
try:
    service = Service(executable_path=DRIVER_PATH)
    driver = webdriver.Chrome(service=service, options=options)
except Exception as e:
    print(f"Error in setting up Chrome service web driver: {e}")

# Wait for page to load
wait = WebDriverWait(driver, 10)

# Method to load all events from Charlotte's Got Alot
def load_all_events_char_got_alot():
    try:
        driver.get("https://www.charlottesgotalot.com/events")
        while True:
            try:
                # Locate the "Show More" button using its class
                show_more_button = wait.until(
                    EC.element_to_be_clickable((By.XPATH, '//button[contains(@class, "ais-infinite-hits--showmoreButton")]'))
                )
                
                # Scroll to the button and click it
                ActionChains(driver).move_to_element(show_more_button).perform()
                show_more_button.click()

                # Wait to allow the new events to load
                time.sleep(3)
            
            except Exception as e:
                print(f"Could not locate 'Show More' button: {e}")
                break
    except Exception as e:
        print(f"Error loading events from Charlotte's Got Alot: {e}")

# New method to load all events from CLT Today
def load_events_clt_today():
    try:
        driver.get("https://clttoday.6amcity.com/events#/")

        # Scroll down the page to load more events if necessary
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            # Scroll to the bottom of the page
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)

            # Check if the page height has changed
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break  # Exit the loop if no more new content is loaded
            last_height = new_height

        # Parse the page source with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        events = soup.find_all("div", class_="csEvWrap")
        clt_today_events = []

        for event in events:
            try:
                # Extracting data
                title = event.find("div", class_="csOneLine").text.strip() if event.find("div", class_="csOneLine") else "No Title"
                location = event.find("span", class_="cityVenue").text.strip() if event.find("span", class_="cityVenue") else "No Location"
                date = event.get("data-date", "No Date")
                image_style = event.find("div", class_="csimg")["style"] if event.find("div", class_="csimg") else ""
                image_url = image_style.split("url(")[-1].split(")")[0].strip('"') if "url(" in image_style else "No Image URL"
                time = ""
                distance = ""

                # Extract time and distance if available
                for info in event.find_all("div", class_="csStaticSize"):
                    if "clock" in info["class"]:
                        time = info.text.strip()
                    elif "distance" in info["class"]:
                        distance = info.text.strip()

                clt_today_events.append({
                    "title": title,
                    "location": location,
                    "date": date,
                    "time": time,
                    "distance": distance,
                    "image_url": image_url
                })

            except Exception as e:
                print(f"Error parsing CLT Today event: {e}")

        return clt_today_events

    except Exception as e:
        print(f"Error loading events from CLT Today: {e}")
        return []

# Load events and save to JSON
load_all_events_char_got_alot()

soup = BeautifulSoup(driver.page_source, 'html.parser')
driver.quit()

# Gather events from Charlotte's Got Alot
events = soup.find_all('div', class_='ais-infinite-hits--item')
events_data = []
unique_events = set()  # To track unique (title, date) pairs

for event in events:
    try:
        listing_div = event.find('div', class_='Listing')
        title = listing_div.get('data-listing-title', 'No Title')
        city = listing_div.get('data-city', 'No City')
        zipcode = listing_div.get('data-zipcode', 'No Zipcode')
        date = event.find('div', class_='Listing-type events')
        address_large_screen = event.find('span', class_='Listing-forLargeScreens')
        address_small_screen = event.find('span', class_='Listing-forSmallScreens')
        neighborhood = event.find('div', class_='Listing-neighborhood')
        website_link = event.find('p', class_='Listing-website').find('a', href=True)

        date_text = date.text.strip() if date else 'No Date'
        address_text = address_large_screen.text.strip() if address_large_screen else address_small_screen.text.strip() if address_small_screen else 'No Address'
        neighborhood_text = neighborhood.text.strip() if neighborhood else 'No Neighborhood'
        website = website_link['href'] if website_link else 'No Website'

        # Only add unique events based on title and date
        event_id = (title, date_text)
        if event_id not in unique_events:
            unique_events.add(event_id)
            events_data.append({
                'title': title,
                'city': city,
                'zipcode': zipcode,
                'date': date_text,
                'address': address_text,
                'neighborhood': neighborhood_text,
                'website': website
            })
    except AttributeError as e:
        print(f"Error parsing event: {e}")

# Add CLT Today events to the list, avoiding duplicates
clt_today_events = load_events_clt_today()
for event in clt_today_events:
    event_id = (event['title'], event['date'])
    if event_id not in unique_events:
        unique_events.add(event_id)
        events_data.append(event)

# Save all event data to JSON
with open('events.json', 'w') as f:
    json.dump(events_data, f, indent=4)

print("Event data has been saved to events.json")
