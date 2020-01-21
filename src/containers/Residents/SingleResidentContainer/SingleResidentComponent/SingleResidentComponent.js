import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./SingleResidentComponent.scss";
import renderHTML from "react-render-html";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import IndexActions from "../../../../actions/index";
import PastShowCard from "./PastShowCard/PastShowCard";

class ResidentShowDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mixCloudWidget: null,
      displayShows: false
    };
    this.timeSpan = React.createRef();
    this.showDescription = React.createRef();
    this.renderFacebook = this.renderFacebook.bind(this);
    this.renderTwitter = this.renderTwitter.bind(this);
    this.renderInstagram = this.renderInstagram.bind(this);
    this.renderShowTime = this.renderShowTime.bind(this);
    this.renderPastShows = this.renderPastShows.bind(this);
    this.mapPastShows = this.mapPastShows.bind(this);
    this.mapMostRecentShow = this.mapMostRecentShow.bind(this);
    this.toggleArchiveclick = this.toggleArchiveclick.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderShowName = this.renderShowName.bind(this);
    this.handleMixCloudClick = this.handleMixCloudClick.bind(this);
    this.renderShowBgImgStyle = this.renderShowBgImgStyle.bind(this);
    this.renderCardContainerMargin = this.renderCardContainerMargin.bind(this);
    this.renderArchiveButton = this.renderArchiveButton.bind(this);
  }

  renderFacebook() {
    if (this.props.facebook) {
      return (
        <div className="social-icon">
          <a href={this.props.facebook} target="blank">
            <img src="/facebook-white.png" alt="facebook page" />
          </a>
        </div>
      );
    }
  }

  renderTwitter() {
    if (this.props.twitter) {
      return (
        <div className="social-icon">
          <a href={this.props.twitter} target="blank">
            <img src="/twitter-white.png" alt="twitter profile" />
          </a>
        </div>
      );
    }
  }

  renderInstagram() {
    if (this.props.instagram) {
      return (
        <div className="social-icon">
          <a href={this.props.instagram} target="blank">
            <img src="/instagram-white.png" alt="instagram profile" />
          </a>
        </div>
      );
    }
  }

  renderShowTime() {
    if (this.props.showTime) {
      return (
        <div className="resident-show-time">
          <span ref={this.timeSpan}>{this.props.showTime}</span>
        </div>
      );
    }
  }

  renderPastShows() {
    if (this.props.pastShows) {
      let fullShowDisplay = this.mapPastShows();
      let mostRecentShow = this.mapMostRecentShow();

      if (this.state.displayShows === true) {
        return (
          <div className="resident-show-pastshows-container">
            <div className="most-recent">{mostRecentShow}</div>
            <div
              className="cards-container"
              style={this.renderCardContainerMargin()}
            >
              {fullShowDisplay}
            </div>
          </div>
        );
      } else {
        return (
          <div className="resident-show-pastshows-container">
            <div className="most-recent">{mostRecentShow}</div>
          </div>
        );
      }
    }
  }

  mapPastShows() {
    let showDisplay = this.props.pastShows.map(show => {
      let tags = show.tags.map(tag => {
        return (
          <div className="mixcloud-tag" key={tag.url}>
            <span>{tag.name}</span>
          </div>
        );
      });
      return (
        <PastShowCard
          handleMixCloudClick={e => this.handleMixCloudClick(show)}
          key={this.props.pastShows.indexOf(show)}
          renderDate={this.renderDate(show.name)}
          renderShowName={this.renderShowName(show.name)}
          tags={tags}
        />
      );
    });
    showDisplay.splice(0, 1);
    return showDisplay;
  }

  mapMostRecentShow() {
    let show = this.props.pastShows[0];
    return (
      <div
        className="resident-pastshow-card"
        onClick={e => this.handleMixCloudClick(show)}
        key={this.props.pastShows.indexOf(show)}
      >
        {/* <FontAwesomeIcon icon={faMixcloud} className="faMixcloud" /> */}
        <div className="showname-info-cont">
          <span className="resident-mixcloud-date">
            {this.renderDate(show.name)}
          </span>
          <span className="resident-mixcloud-showname">
            {this.renderShowName(show.name)}
          </span>
        </div>
      </div>
    );
  }

  toggleArchiveclick() {
    if (this.state.displayShows === true) {
      scroll.scrollTo(0);
      Events.scrollEvent.register(
        "end",
        function() {
          console.log("End");
          this.setState({ displayShows: false });
        }.bind(this)
      );
    } else {
      Events.scrollEvent.remove("end");
      this.setState({ displayShows: true }, scroll.scrollTo(200));
    }
  }

  renderCardContainerMargin() {
    if (this.props.mixCloudWidget) {
      return {
        marginBottom: "123px"
      };
    } else {
      return null;
    }
  }

  renderShowName(showName) {
    if (showName.includes("-")) {
      let name = showName.split(" - ")[0].trim();
      return name;
    } else {
      return showName;
    }
  }

  renderDate(showName) {
    let dateToReturn = "";
    if (showName.includes("-")) {
      let date = showName.split(" - ")[1];
      if (date) {
        dateToReturn = date.trim();
      }
      return dateToReturn;
    } else {
      return;
    }
  }

  handleMixCloudClick(show) {
    let url = `https://api.mixcloud.com${show.key}embed-json/`;
    axios.get(url).then(res => {
      this.props.setMixcloudWidget(res.data.html);
    });
  }

  renderShowBgImgStyle() {
    let margin = null;

    if (this.props.mixCloudWidget) {
      margin = "123px";
    } else {
      margin = null;
    }

    return {
      backgroundImage: `url(${this.props.showImage})`,
      marginBottom: margin
    };
  }

  renderArchiveButton() {
    if (this.props.pastShows) {
      if (this.state.displayShows) {
        return (
          <div
            className="pastshows-button active"
            onClick={this.toggleArchiveclick}
          >
            <h1>Archive</h1>
            {/* <FontAwesomeIcon icon={faChevronDown} className="down" /> */}
          </div>
        );
      } else {
        return (
          <div className="pastshows-button" onClick={this.toggleArchiveclick}>
            <h1>Archive</h1>
            {/* <FontAwesomeIcon icon={faChevronRight} /> */}
          </div>
        );
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="resident-show-bg-img"
          style={this.renderShowBgImgStyle()}
        />

        <div className="resident-show-display-container">
          <div className="resident-show-text-container">
            <div className="resident-show-title-container">
              <h3>
                <span>{this.props.showTitle}</span>
              </h3>
              {this.renderShowTime()}
            </div>

            <div className="resident-show-socials">
              {this.renderFacebook()}
              {this.renderTwitter()}
              {this.renderInstagram()}
            </div>

            {this.props.showDescription ? (
              <div
                className="resident-show-display-description"
                ref={this.showDescription}
              >
                <p>
                  <span>{this.props.showDescription}</span>
                </p>
              </div>
            ) : null}
          </div>

          {this.renderArchiveButton()}

          {this.renderPastShows()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    playing: state.index.playing,
    volume: state.index.volume,
    mixCloudWidget: state.index.mixCloudWidget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePlaying: toggle => {
      dispatch(IndexActions.switchPlaying(toggle));
    },
    changeVolume: value => {
      dispatch(IndexActions.switchVolume(value));
    },
    setMixcloudWidget: value => {
      dispatch(IndexActions.setMixcloudWidget(value));
    }
  };
};

const Index = connect(mapStateToProps, mapDispatchToProps)(ResidentShowDisplay);
export default Index;
