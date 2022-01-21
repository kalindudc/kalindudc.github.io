marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

main();

async function main() {
  var params = new URLSearchParams(window.location.search);
  if (params.has("article")) {
    console.log("Try to render blog post!")
    renderMarkdown(sanitizeString(params.get("article")));
  }
  else {
    if (params.toString().length > 0) {
      console.log("invalid query")
      window.location = "/404"
    }

    console.log("Show all blog posts")
    fetch("/blog/articles/",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    .then(data => {

      if (!data.ok) {
        console.log("no data 1", data)
        window.location = "/404"
        return;
      }
      else {
        return data.json();
      }
    })
    .then(body => {
      if (body.files.length < 2) {
        document.getElementById('content').innerHTML = "Blog is empty"
        return;
      }
      renderListOfArticles(body.files.slice(1))
      .then(posts => {
        console.log(posts);
        posts.forEach(post => {
          addPostToList(post);
        });
        $(".blog-post-listing").each(function(){
          ScrollReveal().reveal(this, {distance: "40px", delay: 200});
        });
      });
    });
  }
}

function renderMarkdown(article) {
  fetch("/blog/articles/" + article + ".md")
    .then(data => {

      if (!data.ok) {
        console.log("no data 2", data)
        window.location = "/404"
        return;
      }
      else {
        return data.text()
      }
    })
    .then(html => {
      var front = yamlFront.loadFront(html);
      console.log(front)
      document.getElementById('content').innerHTML = `
        <div class="post-content fill">${marked.parse(front.__content)}</div>
      `
    });
}

async function renderListOfArticles(files) {
  document.getElementById('content').innerHTML = '<div id="blog-posts-list"></div>'

  var posts = []
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    console.log(file)
    var response = await fetch("/blog/articles/" + file.title)
    var contents = await response.text()
    var front = yamlFront.loadFront(contents);
    front.fileName = file.name;
    posts.push(front);
  }

  posts.sort(function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  });

  return posts;
}

function addPostToList(data) {
  document.getElementById('blog-posts-list').innerHTML += `
    <a href="/blog?article=${data.fileName}">
      <div class="blog-post-listing">
        <div class="top">
          <div class="title">
            ${data.title}
          </div>
          <div class="date">
            ${data.date}
          </div>
        </div>
        <div class="bottom">
          ${data.description}
        </div>
      </div>
    </a>
  `;
}

function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}
