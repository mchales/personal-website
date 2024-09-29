## Introduction
LLMs are great at digesting large bodies of text (or any unstructured data) and quickly synthesizing them into a concise summary. Summarization is widely used across LLMs and is one of their most used features. Paired with [retrieval augmented-generation](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)summarization provides LLMs the ability to use any context data source and enhance accuracy for user queries. Safe to say, the ability of LLMs to summarize quickly and accurately is important.

In this post, I will summarize my work in a graduate class group project developing a novel LLM summarization technique. I built my own versions of [LangChain’s](https://www.langchain.com/) [MapReduce](https://api.python.langchain.com/en/latest/chains/langchain.chains.combine_documents.map_reduce.MapReduceDocumentsChain.html) and [Refine](https://api.python.langchain.com/en/latest/chains/langchain.chains.combine_documents.refine.RefineDocumentsChain.html#langchain.chains.combine_documents.refine.RefineDocumentsChain) algorithms and merged them into one algorithm.

## MapReduce
MapReduce is used across all areas of computer science. There are frameworks such as [Hadoop](https://hadoop.apache.org/) to perform MapReduce efficiently. MapReduce is used when you have one big task that can be split into many smaller tasks where each smaller task can be done independently.

In the context of LLMs and summarization, MapReduce involves taking one very large document, say a book. Splitting the book into smaller pieces, such as chapters. A LLM summarizes each chapter in parallel. Then the LLM summarizes all the output chapter summaries into a final summary.

![Map Reduce](/projects/llm-summary/map-reduce.jpg)

This approach has its pros and cons.

**Pros**:
- Parallelizable so very fast

**Cons**
- Each chunk doesn’t have the context of other chapters (chunk)

Since each chapter is summarized independently, a chapter later in the book won’t have any important information from earlier in the book. It will not know about character development, setting, plot, etc. This reduces the summary quality of the chapter. To overcome this pitfall a new method is used called **refine** (however it also has its downside).

## Refine
The refine summarization technique involves using a running summary. The very large document is split into chunks, the first chunk gets summarized, then this summary is refined with the content from the second chunk. Then the running summary is refined by the next chunk and so on. For a book, the first chapter will be summarized. Then the content of the second chapter will be used to modify the existing summary. Then the process continues for each chapter.

![Refine](/projects/llm-summary/refine.jpg)

**Pro**s:
- Sequentially builds the summary with information from the previous

**Cons**: 
- Slow since each chunk needs to wait for the earlier chunk

Unlike MapReduce, this process is no longer parallelizable since each chunk relies on the summary created by all previous chunks. This makes the process very slow.

## MapRefine
What if we could combine **MapReduce** and **Refine** where we have a process that is both parallelizable and sequentially builds a summary? This is what my work centers around– a summary technique called MapRefine. In MapRefine, the very large document is split into big chunks (multiple chapters), Refine is run on all the big chunks, and then all the refine summaries are combined and reduced into a final summary by an LLM.

![Map Refine](/projects/llm-summary/map-refine.jpg)

**Pros**:
- Parallelizable so very fast
- Sequentially builds the summary with information from the previous

**Cons**
- ~~Each chunk doesn’t have the context of other chapters (chunk)~~
- ~~Slow since each chunk needs to wait for the earlier chunk~~

To have greater flexibility, the ability to test individual methods, and better insights into token usage I developed my own version of [MapReduce](https://github.com/aahn33/llm-summary/blob/main/map_and_refine/map_reduce.py) and [Refine](https://github.com/aahn33/llm-summary/blob/main/map_and_refine/refine.py). I then combined them to create [MapRefine](https://github.com/aahn33/llm-summary/blob/main/map_and_refine/map_refine.py).

## Results
To test this summarization technique, along with others created by the team, we used a GovReport dataset consisting of 19,500 U.S. government reports with expert-written summaries. Each report has 9,500 words on average, with an average 553-word summary.

To determine whether our generated summary is of high quality when compared to the ground truth summary we used [ROUGE](https://en.wikipedia.org/wiki/ROUGE_(metric)) scores. Higher scores indicate better-quality summaries. We used the following ROUGE metrics:

- ROUGE-1: Overlap of unigrams (words) between summaries
- ROUGE-2: Overlap of bigrams between summaries
- ROUGE-L: Overlap of longest common subsequences at the sentence level

![ROUGE SCORES](/projects/llm-summary/rouge-scores.jpg)
Unfortunately, Map & Refine did not perform well. A possible explanation for this could be that the complexity of combining the two methods introduces inefficiencies or redundancies in how the summaries are generated. The results of the refining step are quite large and in some instances, the first refine was included the most.

Additionally, we analyzed the runtime and token usage of each of the methods. MapRefine eliminates the slow runtime of Refine.

![Runtime Tokens](/projects/llm-summary/runtime-tokens.jpg)
## Conclusion
In summary, while the MapRefine technique was promising in concept, it encountered practical challenges when applied to a large, complex dataset like GovReport. Multiple iterations of prompts were used, but none resulted in high-quality summaries. Future work could focus on exploring more refined ways to merge the outputs of MapReduce and Refine, perhaps incorporating feedback loops or content checking.