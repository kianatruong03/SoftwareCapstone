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
            # Corrected code to find the "Show More" button
            show_more_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="events-listing"]/div/div[2]/button')))

            ActionChains(driver).move_to_element(show_more_button).perform()
            show_more_button.click()

            time.sleep(3)
        except Exception as e:
            print(f"No more 'Show More' button to click: {e}")
            break

load_all_events_char_got_alot()

soup = BeautifulSoup(driver.page_source, 'html.parser')

driver.quit()

events = soup.find_all('div', class_='Listing')
events_data = []

for event in events:
    try:
        title = event.find('div', class_='data-listing-title')
        date = event.find('div', class_='Listing-type events')
        location = event.find('div', class_='Listing-address')

        # Ensure the element exists before trying to extract text
        if title and date and location:
            title_text = title.text.strip()
            date_text = date.text.strip()
            location_text = location.text.strip()
            events_data.append({
                'title': title_text,
                'date': date_text,
                'location': location_text
            })
        else:
            print("One or more elements missing for an event.")
    except AttributeError as e:
        print(f"Error parsing event: {e}")

events_json = json.dumps(events_data, indent = 4)
with open('events.json', 'w') as f:
    f.write(events_json)
    
print("Event data has been saved to events.json")