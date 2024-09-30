## Introduction
In this project I explored using GPT-3.5 to extract medical information from breast cancer forum posts, focusing on medications, symptoms, and treatment perspectives. I scraped and labeled a dataset of 100 posts and tested three types of prompts: basic, with examples, and with reasoning. While GPT-3.5-turbo performed inconsistently, often rephrasing or misclassifying symptoms, prompts with examples provided better results. I concluded that this model and prompt approach has limitations for practical NER tasks.

## Data Collection
To collect data I scraped 7000+ posts from a [breast cancer forum](https://community.breastcancer.org/forum/78). I used [Scrapy](https://scrapy.org/) which I choose over [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) for it's native web crawling abilities.



### Scrapy Spider Project - Key Parts

This project scrapes a breast cancer forum using two Scrapy spiders to collect topics and extract detailed patient posts. I used [ScrapeOps](https://scrapeops.io/) to run the scraping job.

Below are the important sections of the code: 

### 1. Proxy Setup
```python
def get_proxy_url(url):
    payload = {'api_key': API_KEY, 'url': url}
    proxy_url = 'https://proxy.scrapeops.io/v1/?' + urlencode(payload)
    return proxy_url
```
- This function generates a proxy URL using an API key to avoid scraping restrictions.

### 2. `TopicSpider` for Collecting Topic Links
```python
class TopicSpider(scrapy.Spider):
    name = "TopicCrawl"
    start_urls = ["https://community.breastcancer.org/forum/78/"]

    def parse(self, response):
        for post in response.css('ul.rowgroup.topic-list li'):
            yield {'link': "https://community.breastcancer.org" + post.css('a').attrib['href']}

        next_page = response.css('a.next_page').attrib['href']
        if next_page == "/forum/78?page=545":
            next_page = "/forum/78?page=546"
        if next_page is not None:
            yield response.follow("https://community.breastcancer.org" + next_page, callback=self.parse)
```
- Scrapes forum topic links and handles pagination, correcting a broken link for page 545.

### 3. `MainPostSpider` for Extracting Patient Posts
```python
class MainPostSpider(scrapy.Spider):
    name = "MainPostCrawl"

    def start_requests(self):
        with open('output.json', 'r') as f:
            data = json.load(f)
        for item in data:
            yield scrapy.Request(url=get_proxy_url(item['link']), callback=self.parse)
```
- Reads topic links from `output.json` and requests each URL via a proxy.

### 4. Post Parsing and Data Cleaning
```python
def parse(self, response):
    title = response.css('h1::text').get()[7:]
    org_post = response.css("div.original-topic")
    text = str(org_post.css("div.user-post").get())
    specific_index = text.find("<span class="line">")

    if specific_index != -1:
        details = extract_details(text[specific_index:])
    post_data, post = clean_post_text(text[:specific_index])
    
    yield {'Title': title, 'Post-Data': post_data, "Post": post, 'Details': details}
```
- Extracts and cleans post text, separating metadata and specific details like symptoms.
- Functions `extract_details` and `clean_post_text` handle the text extraction and cleaning.

**Below is the important parts of the website for crawling and data collecition**
![Scraping Overview](/projects/llm-ner/scraping-overview.jpg)

## Data Cleaning and Labeling
Filtered 7000 posts to those that contained hormone drugs, with 4000 left I randomly sampled 200, 100 were acceptable patient posts. Then hand labeled the following categories:

**Medcations and Symptoms**
- What kind of medication(s) did the author take?
- What kind of medication(s) is the author currently taking?
- Are there any side effects mentioned by taking their medication?

**Status**
- Do you think the author wants to stop, pause, continue, change, or has already completed the most recent medication?

## Prompting
To query ChatGPT with the questions we used three types of prompts:

**Three Types to Compare Performance:**
- Prompt 1: Basic (asking directly)
- Prompt 2: Basic and include an example response
- Prompt 3: Basic and have ChatGPT provide reasoning

**Example Prompt 1**:
>You will be given a post from a breast cancer forum. Perform NER to get the previous medication(s), current medications(s), and symptom(s) the patient is experiencing. Please return these values in a two dimensional array. The array should contain an array of previous medication(s), an array of current medication(s), and an array of symptoms. Each entry should be an exact string from the patient post (no grammar corrections, no spelling corrections, no rephrasing). A sample response could be: [["previous medication 1", "previous medication 2"], ["current medication 1"], []]. In this sample response the patient has no symptoms so the array of symptoms is empty. This is the patient post:


## Defining Metrics for Medcations and Symptoms

- **True Positive**: In reference and in predicted.
- **False Positive**: In predicted but not reference.
- **True Negative**: Not in reference and not predicted.
- **False Negative**: In reference but not in predicted.

- **Strict**: Total string comparison (`"mood swing"` != `"mood"`).
- **Relaxed**: String inclusion (`"cranking leg pains"` == `"leg pains"`).


## Results: Medications and Symptoms
![Medication Symptoms NER Results](/projects/llm-ner/medication-results.jpg)

Unfortunately, the model perfomed very poorly on NER metrics. The model has difficulty differentiating between symptoms the patient has versus symptoms they are asking about.

## Results: Status
![Status Results](/projects/llm-ner/status-results.jpg)

The model did a better job at predicting the status of the user

## Possible Product
If performance can be increased, this could be used as a tool for doctors to easily recognize patient medication and symtoms in text data.
![Prototype](/projects/llm-ner/sample-usage.gif)

## Conclusion
The current approach using GPT-3.5 for Named Entity Recognition (NER) in medical forums, specifically breast cancer discussions, had poor performance. The model was inconsistent, particularly in differentiating between symptoms experienced by patients and those mentioned in a general context. Despite these challenges, advancements in newer models (which weren't available during this project) could potentially enhance accuracy, making this a promising area for future exploration and improvement in medical text processing.