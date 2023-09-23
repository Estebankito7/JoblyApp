import { JobSearch } from './JobSearch.js';

const jobSearch = new JobSearch('#search-form', '.result-container', '.loading-element');
jobSearch.setCountryCode();
jobSearch.configureFormListener();

const cardTextElement = document.querySelector(".card-text"); 

if (cardTextElement) {
  const maxLength = 10;
  const jobDescription = job.job_description;

  if (jobDescription.length > maxLength) {
    const truncatedDescription = jobDescription.substring(0, maxLength); 
    cardTextElement.textContent = truncatedDescription + " ..."; 
  } else {
    cardTextElement.textContent = jobDescription;
  }
}
