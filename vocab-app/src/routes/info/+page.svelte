<div class="help-button"><a href="/info"><img src="/help.png"></a></div>
<div class="home-button"><a href="/"><img src="/home.png"></a></div>


    <div class="pt-5 pl-20 pb-10 pr-20">
      <h1>Where did this data come from?</h1>
      <p class="home-text"> 
        In order to demonstrate a prototype of this visualization tool, we used the CounterFact dataset 
        <a href="https://rome.baulab.info/" class="highlighted-link">(Meng et al., 2022)</a> as a starting point to get a list of entities.
        This dataset contains about 20 thousand prompts with known entities and facts about them. 
        <br><br>
        Previous work from <a href="https://rome.baulab.info/">Meng et al. (2022)</a> and <a href="https://arxiv.org/abs/2304.14767" class="highlighted-link">Geva et al. (2023)</a> suggests 
        that for multi-token entities, Transformer models collect factual information about entities in early layers at the last token position of that entity (e.g. early representations of 
        "Wars" in "Star Wars"). Our results show that simple linear probes trained to predict "Wars" from "Star" actually systematically fail for CounterFact 
        entities (with an accuracy of 0.4%), even though the same probes can predict regular bigrams quite reliably ("is" from "He").
    
    <br><br><br>
    <h2>Where did this plot come from?</h2>
    <p class="home-text">
        For CounterFact prompts that Llama-2 was able to answer correctly, we take the hidden representations of the <i>last</i> token for each
        entity and perform dimensionality reduction to get a 2D vector describing that hidden state's similarity to other concept hidden states, 
        resulting in the scatterplot shown on this website. Currently, the data being displayed is a tSNE plot of representations at the first layer of Llama-2. 
        Confidence scores are currently placeholders. Euclidean distance measures how far any given point is to another. 
      </p>
    </div>
