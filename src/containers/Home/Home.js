import React from "react";
import CurrentShow from "../../components/CurrentShow/CurrentShow";
import Schedule from "../../components/Schedule/Schedule";
import { Helmet } from "react-helmet";
import PlaceholderShowImg from "../../assets/images/placeholder-showimg.jpg";
import styled from "styled-components";

const HomeContainer = props => {
  return (
    <React.Fragment>
      <Helmet>
        <title>EH-FM</title>
        <meta name="fragment" content="!" />
        <meta property="og:title" data-react-helmet="true" content="EH-FM" />
        <meta
          name="description"
          data-react-helmet="true"
          content="EH-FM is an Edinburgh-based online radio station, providing a platform for the capital's local artists and broadcasting 24 hours a day."
        />
        <meta
          property="og:description"
          data-react-helmet="true"
          content="EH-FM is an Edinburgh-based online radio station, providing a platform for the capital's local artists and broadcasting 24 hours a day."
        />
        <meta
          property="og:url"
          data-react-helmet="true"
          content="https://www.ehfm.live"
        />
        <meta
          property="og:image"
          data-react-helmet="true"
          content={PlaceholderShowImg}
        />
        <meta
          name="twitter:image"
          data-react-helmet="true"
          content={PlaceholderShowImg}
        />
      </Helmet>

      <div
        className="body-container"
        style={{ marginBottom: props.mixCloudWidget ? "123px" : null }}
      >
        <CurrentShow
          currentShow={props.currentShow}
          residents={props.residents}
          playing={props.playing}
          handlePlayPauseClicked={props.handlePlayPauseClicked}
        />

        <Schedule
          daysToDisplay={props.daysToDisplay}
          selectedDay={props.selectedDay}
        />
      </div>
    </React.Fragment>
  );
};

const BodyContainer = styled.div``;

export default HomeContainer;
