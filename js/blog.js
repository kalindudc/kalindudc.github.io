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

    fetchFrom(false)
    .then(ok => {
      if (!ok) {
        fetchFrom(true)
        .then(ok => {
          if (!ok) {
            window.location = "/404";
          }
        });
      }
    });

  }
}

async function fetchFrom(isGithub) {
  var path = "/blog/articles/";
  if (isGithub) {
    path = "https://api.github.com/repos/kalindudc/kalindudc.github.io/contents/blog/articles";
  }

  var resp = await fetch(path,
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .then(data => {
    if (!data.ok) {
      console.log("no data 1", data)
      return false;
    }
    else {
      return data.json();
    }
  })
  .then(body => {
    if (!body) {
      return false;
    }

    if ((!isGithub && body.files.length < 2) || (isGithub && body.length < 1)) {
      document.getElementById('content').innerHTML = "Blog is empty"
      return true;
    }
    renderListOfArticles(isGithub ? body : body.files.slice(1))
    .then(posts => {
      console.log(posts);
      posts.forEach(post => {
        addPostToList(post);
      });
      $(".blog-post-listing").each(function(){
        ScrollReveal().reveal(this, {distance: "40px", delay: 200});
      });
      return true;
    });
    return true;
  });

  return resp;
}

async function fetchFromGithub() {
  console.log("Show all blog posts")
  var resp = await fetch("https://api.github.com/repos/kalindudc/kalindudc.github.io/contents/blog/articles",
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  .then(data => {
    if (!data.ok) {
      console.log("no data 1", data)
      return false;
    }
    else {
      return data.json();
    }
  })
  .then(body => {
    if (!body) {
      return false;
    }
    console.log("from github",body)

    if (body.length < 1) {
      document.getElementById('content').innerHTML = "Blog is empty"
      return true;
    }
    renderListOfArticles(body)
    .then(posts => {
      console.log(posts);
      posts.forEach(post => {
        addPostToList(post);
      });
      $(".blog-post-listing").each(function(){
        ScrollReveal().reveal(this, {distance: "40px", delay: 200});
      });
      return true;
    });
    return true;
  });

  return resp;
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
    var name = file.name.replace(".md", "")
    console.log(file)
    var response = await fetch("/blog/articles/" + name + ".md")
    var contents = await response.text()
    var front = yamlFront.loadFront(contents);
    front.fileName = name;
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
