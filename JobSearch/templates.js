function cortarDescripcion(descripcion) {
  const palabras = descripcion.split(' ');

  if (palabras.length > 100) {
    const descripcionCortada = palabras.slice(0, 100).join(' ');
    return `${descripcionCortada} ...`;
  } else {
    return descripcion; 
  }
}
export const jobTemplate = (job, currency) =>
`
<div class="card">
  <div class="card-body">
  <h3>Publicado en ${job.job_publisher}</h3>
  <h4 class="card-title">${job.job_title}
  </h4>
  <h4>Valoración de los candidatos que han aplicado:${job.job_apply_quality_score}/1</h4>
  <h5>${job.job_city}</h5>
  <p class="card-text">${cortarDescripcion(job.job_description)}</p>
  <a class="Joblink" href="${job.job_apply_link}">View Job</a>
  </div>
</div>
`;
