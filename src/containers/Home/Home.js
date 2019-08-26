import React from "react";
import CurrentShow from "../../components/CurrentShow/CurrentShow";
import Schedule from "../../components/Schedule/Schedule";
import { Helmet } from "react-helmet";

const HomeContainer = (props) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>EH-FM</title>
        <meta name="fragment" content="!" />
        <meta property="og:title" data-react-helmet="true" content="EH-FM" />
        <meta name="description" data-react-helmet="true" content="Independent community radio for Edinburgh" />
        <meta property="og:description" data-react-helmet="true" content="Independent community radio for Edinburgh" />
        <meta property="og:url" data-react-helmet="true" content="http://www.ehfm.live" />
        <meta name="twitter:image" data-react-helmet="true" content="https://www.ehfm.live/placeholder-showimg.jpg" />
        <meta name="twitter:image" data-react-helmet="true" content="https://www.ehfm.live/placeholder-showimg.jpg" />
      </Helmet>

      <div className="body-container" style={{ marginBottom: props.mixCloudWidget ? "123px" : null }}>
        <CurrentShow
          currentShow={props.currentShow}
          residents={props.residents}
          playing={props.playing}
          handlePlayPauseClicked={props.handlePlayPauseClicked}
        />

        <Schedule daysToDisplay={props.daysToDisplay} selectedDay={props.selectedDay} />
      </div>
    </React.Fragment>
  );
};

export default HomeContainer;
