async function secuencial() {
  console.time("Secuencial");
  const respuestaUsuarios = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await respuestaUsuarios.json();

  for (let i = 0; i < 3; i++) {
    const user = usuarios[i];
    const respuestaPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const posts = await respuestaPosts.json();
    console.log(`${user.name} tiene ${posts.length} publicaciones`);
  }

  console.timeEnd("Secuencial");
}

async function paralelo() {
  console.time("Paralelo");
  const respuestaUsuarios = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await respuestaUsuarios.json();
  const primeros3 = usuarios.slice(0, 3);

  const promesas = primeros3.map(user =>
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(r => r.json())
      .then(posts => `${user.name} tiene ${posts.length} publicaciones`)
  );

  const resultados = await Promise.all(promesas);
  resultados.forEach(r => console.log(r));

  console.timeEnd("Paralelo");
}

// main
(async () => {
  console.log("--- Ejecucion Secuencial ---");
  await secuencial();

  console.log("\n--- Ejecucion Paralela ---");
  await paralelo();
})();
