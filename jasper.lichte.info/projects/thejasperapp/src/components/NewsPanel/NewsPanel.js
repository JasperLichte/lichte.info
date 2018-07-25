import React, { Component } from "react";
import "./NewsPanel.css";

class NewsPanel extends Component {
  constructor() {
    super();
    this.state = {
      news: {},
      doneLoading: false,
      category: "general"
    };
    this.getNews(this.state.category);
  }

  getNews = category => {
    this.setState({
      doneLoading: false
    });

    const options = {
      key: "d7a07be3c2ac4c9eae50384df7a167ac",
      country: "de",
      language: "de",
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
          news: data,
          doneLoading: true,
          category: category
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
                <a href={url} target="_blank">
                  Weiter lesen
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  changeButtonStyleOnClick = el => {
    document
      .querySelectorAll(".NewsPanel.active .buttons button")
      .forEach(item => {
        item.setAttribute("class", "");
      });
    el.setAttribute("class", "active");
  };

  render() {
    let currentCategory = this.state.category;
    return (
      <div
        className={
          this.state.news.status === "ok" ? "NewsPanel active" : "NewsPanel"
        }
      >
        <div className="buttons">
          <button
            className="active"
            onClick={e => {
              currentCategory !== "general" && this.getNews("general");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Allgemein
          </button>
          <button
            onClick={e => {
              currentCategory !== "technology" && this.getNews("technology");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Technik
          </button>
          <button
            onClick={e => {
              currentCategory !== "science" && this.getNews("science");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Wissenschaft
          </button>
          <button
            onClick={e => {
              currentCategory !== "sport" && this.getNews("sport");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Sport
          </button>
          <button
            onClick={e => {
              currentCategory !== "health" && this.getNews("health");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Gesundheit
          </button>
          <button
            onClick={e => {
              currentCategory !== "entertainment" &&
                this.getNews("entertainment");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Entertainment
          </button>
          <button
            onClick={e => {
              currentCategory !== "business" && this.getNews("business");
              this.changeButtonStyleOnClick(e.target);
            }}
          >
            Business
          </button>
        </div>
        {!this.state.doneLoading ? <div className="loading" /> : null}
        {this.state.doneLoading ? this.getNewsNodes() : null}
      </div>
    );
  }
}

export default NewsPanel;
