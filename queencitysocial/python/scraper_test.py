# https://charlotteconcertguide.com/concerts/
# https://www.charlottesgotalot.com/events class = Listing
# https://clttoday.6amcity.com/eve
# https://www.charlotteonthecheap.com/events/
# https://www.axios.com/local/charlotte/events?page=1
# https://www.charlottemagazine.com/things-to-do/?_evDiscoveryPath=/&evPage=2

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

DRIVER_PATH = "C:/Users/Jenna/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe"


# CONFIGURE CHROME OPTIONS
try:
    options = Options()
    options.headless = True # Enable headless mode, In headless mode, Chrome operates in the background with no visible interface, saving valuable system resources.
    options.add_argument('--window-size=1920,1200')
except:
    print("Error in configuring Chromedrive options.")

# Set up Chrome service
try:
    service = Service(executable_path = DRIVER_PATH)
    driver = webdriver.Chrome(service = service, options = options)
    driver.get("https://www.charlottesgotalot.com/events")
except:
    print("Error in setting up chrome service web driver")

wait = WebDriverWait(webdriver, 10)

def load_all_events_char_got_alot():
    while True:
        try:
            # Locate the "Show More" button using its class name
            show_more_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[contains(@class, "ais-infinite-hits--showmoreButton")]')))
            
            # Scroll to the button and click it
            ActionChains(driver).move_to_element(show_more_button).perform()
            show_more_button.click()

            # Pause to allow new events to load
            time.sleep(3)
        except Exception as e:
            # When there are no more buttons or if any error occurs
            print(f"No more 'Show More' button to click: {e}")
            break
        

load_all_events_char_got_alot()

soup = BeautifulSoup(driver.page_source, 'html.parser')

driver.quit()

events = soup.find_all('div', class_='ais-infinite-hits--item')
events_data = []

for event in events:
    try:
        # Extracting event data from attributes and elements
        listing_div = event.find('div', class_='Listing')
        title = listing_div.get('data-listing-title', 'No Title')  # Fallback to 'No Title' if not found
        city = listing_div.get('data-city', 'No City')
        zipcode = listing_div.get('data-zipcode', 'No Zipcode')

        # Extracting event details
        date = event.find('div', class_='Listing-type events')
        address_large_screen = event.find('span', class_='Listing-forLargeScreens')
        address_small_screen = event.find('span', class_='Listing-forSmallScreens')
        neighborhood = event.find('div', class_='Listing-neighborhood')
        website_link = event.find('p', class_='Listing-website').find('a', href=True)

        # Extract text content or fallback if elements are missing
        date_text = date.text.strip() if date else 'No Date'
        address_text = address_large_screen.text.strip() if address_large_screen else address_small_screen.text.strip() if address_small_screen else 'No Address'
        neighborhood_text = neighborhood.text.strip() if neighborhood else 'No Neighborhood'
        website = website_link['href'] if website_link else 'No Website'

        # Appending event data to the list
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

# Save the event data as JSON
events_json = json.dumps(events_data, indent=4)
with open('events.json', 'w') as f:
    f.write(events_json)

print("Event data has been saved to events.json")