import React, { Component } from "react";
import "./NewsPanel.css";

class NewsPanel extends Component {
  constructor() {
    super();
    this.state = {
      news: {}
    };
    this.getNews("general");
  }

  getNews = category => {
    const options = {
      key: "d7a07be3c2ac4c9eae50384df7a167ac",
      country: "de",
      language : "de",
      category: category,
      pageSize: 20
    };

    fetch(
      "https://newsapi.org/v2/top-headlines?country=" +
        options.country +
        "&language=" +
        options.language +
        "&category=" +
        options.category +
        "&pageSize=" +
        options.pageSize +
        "&apiKey=" +
        options.key
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          news: data
        });
      });
  };

  getNewsNodes = () => {
    const articles = this.state.news.articles;

    return (
      <div>
        {articles.map((el, i) => {
          let {
            author,
            description,
            publishedAt,
            source,
            title,
            url,
            urlToImage
          } = el;
          let a = publishedAt.substr(0, 10).split("-");
          publishedAt = a[2] + "." + a[1] + "." + a[0];
          if (description) {
            return (
              <div
                key={i}
                className="article"
                style={{
                  backgroundImage: "url(" + urlToImage + ")"
                }}
              >
                <div className="shadow">
                  <h3>{title}</h3>
                  <p className="author">
                    {author
                      ? author + ", " + publishedAt
                      : source.name
                        ? source.name + ", " + publishedAt
                        : publishedAt}
                  </p>
                  <p className="description">{description}</p>
                  <a href={url} target="_blank">Weiter lesen</a>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  render() {
    return (
      <div
        className={
          this.state.news.status === "ok" ? "NewsPanel active" : "NewsPanel"
        }
      >
        <div className="buttons">
          <button onClick={() => this.getNews("general")}>Allgemein</button>
          <button onClick={() => this.getNews("technology")}>Technik</button>
          <button onClick={() => this.getNews("science")}>Wissenschaft</button>
          <button onClick={() => this.getNews("sports")}>Sport</button>
          <button onClick={() => this.getNews("health")}>Gesundheit</button>
          <button onClick={() => this.getNews("entertainment")}>
            Entertainment
          </button>
          <button onClick={() => this.getNews("business")}>Business</button>
        </div>
        {this.state.news.status === "ok" ? this.getNewsNodes() : null}
      </div>
    );
  }
}

export default NewsPanel;
