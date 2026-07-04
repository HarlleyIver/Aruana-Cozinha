// Configuracao do Eleventy (11ty) para a Aruana Cozinha.
// Regra de ouro: o index.html original entra no build sem nenhuma alteracao.
module.exports = function (eleventyConfig) {
  // O painel do Decap entra no build copiado exatamente como esta.
  // O index.html agora e processado pelo 11ty (para listar os ultimos posts),
  // mas segue sem tokens de template, entao so muda onde adicionamos o blog.
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("uploads");

  // Data amigavel em portugues, ex: "10 de julho de 2026"
  eleventyConfig.addFilter("dataBr", (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // Colecoes ordenadas da mais recente para a mais antiga
  eleventyConfig.addCollection("eventos", (api) =>
    api.getFilteredByTag("evento").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("receitas", (api) =>
    api.getFilteredByTag("receita").sort((a, b) => b.date - a.date)
  );

  // Os 3 posts mais recentes (receitas + eventos juntos) para a home
  eleventyConfig.addCollection("ultimos", (api) => {
    const posts = [
      ...api.getFilteredByTag("evento"),
      ...api.getFilteredByTag("receita"),
    ];
    return posts.sort((a, b) => b.date - a.date).slice(0, 3);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
