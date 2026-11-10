(async () => {
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 100; i++) {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent.includes("Empezar con el ejemplo"));
    if (b) {
      setTimeout(() => b.click(), 0);
      return "clic en el ejemplo";
    }
    await espera(100);
  }
  return "no está el botón";
})()
