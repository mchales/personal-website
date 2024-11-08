export const description = `
Can inserted errors improve the performance of LLMs? This project investigates the impact of inserting errors in proposed coding solutions and if the performance of LLMs can be improved by doing so.
`;

export const content = `
<h3>Introduction</h2>

<p>Large Language Models (LLMs), such as GPT-3.5 and GPT-4, have recently shown significant progress in their code generation abilities. These models can take in natural language instructions and generate code that meets the user's instructions. However, the code generated by these models is often incorrect, due to both logical and syntactical errors. This project introduces a novel prompt engineering technique, <em>use mistake</em>, which first asks the LLM to construct an erroneous response to the coding problem. Then, that code is passed along with the original prompt to construct the final response. To benchmark the prompting techniques, two code evaluation datasets were used: HumanEval and PythonSaga. The <em>use mistake</em> technique achieved better performance than the standard coding attempt benchmark on the HumanEval dataset with 10 passes. An exploratory analysis was also conducted on how different prompting methods fail specific coding problems.</p>

<h3>Data</h2>

<p>Two different datasets were used to evaluate the effects of various prompting techniques on LLM code generation. The first dataset was <a href="https://github.com/openai/human-eval">HumanEval</a>, a code evaluation dataset that contains 164 hand-crafted Python basic programming problems, designed to ensure that LLMs were not directly trained on these problems. Each of these problems contains a prompt with the method header and example inputs/outputs, along with an example solution and unit tests for the generated code. A significant benefit of using HumanEval is that the code automating the testing of LLM-generated outputs is publicly available. Since its creation in 2021, HumanEval has been widely used to evaluate and test code generation models. The second dataset, <a href="https://anonymous.4open.science/r/PythonSaga">PythonSaga</a>, was recently released in 2024 and contains 185 Python programming problems. These problems were curated from popular coding platforms Geek-for-Geeks and LeetCode. The authors reformulated the problems taken from these coding platforms to maintain the same underlying functionality while transforming the prompting text to make it harder for LLMs to pattern-match the prompt, forcing them to recognize the underlying concepts in different contexts.</p>

<h3>Methodology</h2>

<img src="/projects/llm-coding-eval/proposal.jpg" alt="Design">

<p>This section describes the four different prompting methods tested with LLM code generation.</p>

<h4>Attempt</h3>
<p>The first prompting method was passing the raw prompt of the coding task from the dataset in use. The purpose of this attempt is to act as a baseline to compare the performance of our other prompting methods to. The code generated by this raw attempt is also used in our second technique.</p>

<h4>Use Attempt</h3>
<p>The next prompting method is the <em>use attempt</em> method which provides the LLM with an example LLM generated solution when asking it to solve the same problem. The direct prompt used was:</p>

<blockquote>This is an attempt to the function: \\n {problem} \\n {attempt} \\n If the solution is correct please output the existing function code. If the solution is incorrect fix and output the function code. \\n {problem}</blockquote>

<p>{problem} contains the raw prompt and {attempt} contains the output of a previous raw attempt. The idea of this strategy was to see if providing the LLM with an example solution could improve its accuracy/identification of errors in the previous attempt's strategy.</p>

<h4>Mistake</h3>
<p>Our next prompting method was the mistake method. This is where we asked the LLM to incorrectly answer the coding problem that we provided it. The prompt we used was:</p>

<blockquote>Complete this task with mistakes. Only return your addition to the existing code. Do not repeat the function header. \\n {problem}.</blockquote>

<p>The purpose of this method is to be used in the use mistake prompting method, which requires an example erroneous LLM output.</p>

<h4>Use Mistake</h3>
<p>The final prompting method is our novel <em>use mistake</em> method. In this method, we passed an erroneous example LLM generated solution along with the problem. The prompt used was:</p>

<blockquote>This is an attempt to the function: \\n {problem} \\n {attempt} \\n If the solution is correct please output the existing function code. If the solution is incorrect fix and output the function code. \\n {problem}.</blockquote>

<p>The intention behind this method is to prompt the LLM to be more cognizant and mindful of errors, such as the ones in the wrong attempt that they are passed. We hoped that this would then correlate to reduced number of errors and better generated solutions.</p>

<h3>Evaluation</h2>

<p>We used both HumanEval and PythonSaga to evaluate our code prompting methods. The evaluation method used in the HumanEval paper, pass @ k, has become the standard for measuring LLM code generation accuracy. This strategy involves passing the same prompt to the LLM k times. If any of the k generations pass all of the unit tests, then this problem is given a score of "1" for solving the problem. Otherwise, it is given a score of "0". Calculating the mean of these scores across the code evaluation dataset that is being used then yields the final score. We calculated pass @ 1, 5, and 10 for all of the different prompting methods. Furthermore, we propose a novel combined metric that shows the overall combined power of the <em>attempt</em> and  <em>use mistake</em> methods. Simply, this metric checks if either one of these prompting methods yielded a correct output.</p>

<h3>Implementation Details</h2>

<p>For our LLM, we use OpenAI's GPT-3.5 Turbo with a temperature of 0.8, as that is the standard temperature used with HumanEval. We chose GPT-3.5 Turbo due to significantly lower associated costs for repeated LLM passes with different prompts and methods and GPT-4 Turbo already having the best performance on the HumanEval dataset. We hoped to increase performance with a worse but much cheaper model to show the benefits of our prompting technique. After 10 passes for each problem, we ran the generated code in a Docker container to benchmark using the unit tests and store the results. We also stored the individual LLM generated outputs and benchmark results for more detailed output analysis. Check out our code <a href="https://github.com/mchales/llm-coding-eval">here</a>.</p>

<h3>Results</h2>

<p>Figure 1</p>
<img src="/projects/llm-coding-eval/figure1.png" alt="Figure 1"  width="500">

<p>Figure 2</p>
<img src="/projects/llm-coding-eval/figure2.png" alt="Figure 2"  width="500">

<p>Figure 3</p>
<img src="/projects/llm-coding-eval/figure3.png" alt="Figure 3"  width="500">

<p>Looking at Figure 1 and Figure 2, we can clearly see that the LLM performs significantly better on HumanEval than PythonSaga. This makes sense as PythonSaga is much newer, and thus GPT-3.5 has had less exposure to its problems. Furthermore, as the authors of PythonSaga transformed the coding prompts to be harder for LLMs to identify the underlying question/function of the problem, it makes sense that all prompting methods perform significantly worse on it. For HumanEval, the <em>use mistake</em> prompting method had the best performance, while for PythonSaga, the <em>attempt</em> method performed the best. Given that PythonSaga's involved preprocessing result in significantly poorer overall results, and HumanEval is the more tested dataset, we conducted most of our analysis with HumanEval.</p>

<p>Interestingly, the <em>attempt</em> and <em>use mistake</em> methods don't fail the same problems. We can combine their results to create the metric <em>Combined</em> for HumanEval seen in Figure 3.</p>

<h3>Code Example</h3>
<p>One problem which <em>use mistake</em> succeeded while <em>attempt</em> did not was:</p>

<blockquote>"How many 7s are in numbers that are divisible by 11 or 13 between 1 to n, where n is an input passed in."</blockquote>

<p>The <em>attempt</em> method fails to understand that numbers can have multiple 7s, and that these need to be counted individually. An example generation is:</p>

<pre><code>count = 0
for i in range(1, n):
    if i % 11 == 0 or i % 13 == 0:
        if '7' in str(i):
            count += 1
return count
</code></pre>

<p><em>use mistake</em> successfully answered this question with the generation:</p>

<pre><code>count = 0
for i in range(1, n):
    if i % 11 == 0 or i % 13 == 0:
        for digit in str(i):
            if digit == '7':
                count += 1
return count
</code></pre>

<p>Interestingly, the <em>mistake</em> generated code for this solution is not close to the correct solution:</p>

<pre><code>if i % 7 == 0:
    count += 1
continue
return count
</code></pre>

<p>Although not always reliable, mistake-generated outputs can influence LLMs to solve problems they previously could not.</p>

<h3>Conclusion</h2>

<p>This project proposes a new prompting technique for LLMs that resulted in improved performance with HumanEval pass @ 10. More research will need to be done to explore repeatability and reliability of this technique.</p>

<h3>Extra</h3>

<table>
  <thead>
    <tr>
      <th>Prompting Technique</th>
      <th>HumanEval Pass@1</th>
      <th>HumanEval Pass@5</th>
      <th>HumanEval Pass@10</th>
      <th>PythonSaga Pass@1</th>
      <th>PythonSaga Pass@5</th>
      <th>PythonSaga Pass@10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Attempt</td>
      <td><strong>71.28</strong></td>
      <td>84.85</td>
      <td>89.02</td>
      <td><strong>18.81</strong></td>
      <td><strong>31.32</strong></td>
      <td><strong>35.68</strong></td>
    </tr>
    <tr>
      <td>Mistake</td>
      <td>10.06</td>
      <td>35.80</td>
      <td>53.05</td>
      <td>1.68</td>
      <td>7.46</td>
      <td>12.97</td>
    </tr>
    <tr>
      <td>Use Mistake</td>
      <td>70.79</td>
      <td><strong>88.41</strong></td>
      <td><strong>91.46</strong></td>
      <td>16.00</td>
      <td>27.57</td>
      <td>32.43</td>
    </tr>
    <tr>
      <td>Use Attempt</td>
      <td>66.65</td>
      <td>84.88</td>
      <td>87.80</td>
      <td>13.68</td>
      <td>24.49</td>
      <td>27.03</td>
    </tr>
  </tbody>
</table>
`;
