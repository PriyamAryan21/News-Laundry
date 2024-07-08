import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country:"in",
    category:"general",
    pageSize : 6
  }

  static propTypes = {
    country : PropTypes.string,
    category : PropTypes.string,
    pageSize : PropTypes.number
  }

  toUpper=(str)=> {
    return str
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
     }

  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: this.totalResults,
    };
    document.title = `${this.props.category=="general"?"Home":this.toUpper(this.props.category)} - News Laundry`;
  }

  update= async()=>{
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ec66903ac7c40248a3fa4d6a26ff41b&page=${
      this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      loading: false,
    });
  }

  async componentDidMount() {
    this.update()
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page-1})
    this.update()
  };
  
  handleNextClick = async () => {
    this.setState({page:this.state.page+1})
    this.update();
  };

  render() {
    return (
      <div className="container">
        <h2 className="text-center">News Laundry - Top {this.props.category=="general"?"":this.toUpper(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row my-3">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 mb-3" key={element.url}>
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 50) + "..."
                        : "Cannot fine the title for this article"
                    }
                    newsUrl={element.url}
                    desc={
                      element.description
                        ? element.description.slice(0, 90) + "..."
                        : "No description for this article"
                    }
                    imgUrl={
                      element.urlToImage ? element.urlToImage : "https://www.cnet.com/a/img/resize/4839930c18924d338470092d7d72250fb612d990/hub/2024/05/16/7980e93d-778f-4b08-a816-0f22b93848f1/hero-promo-2.png?auto=webp&fit=crop&height=675&width=1200"
                    }
                    author={
                      element.author?element.author:"Unknown"
                    }
                    date={
                      element.publishedAt
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) - 1 <
              this.state.page
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
