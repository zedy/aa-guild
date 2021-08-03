import hero from "../../../assets/hero.jpg";

export const ModalContentNewUser = ({ handleClick }) => (
  <div
    className="ui segment"
    style={{
      height: "550px",
      width: "800px",
      backgroundImage: "url(" + hero + ")",
    }}
  >
    <div
      className="ui centered middle aligned two column grid"
      style={{ height: "100%" }}
    >
      <div className="row">
        <div className="column">
          <p style={{ color: "white" }}>
            Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam
            alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
            referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
            electram, eos choro alterum definiebas in. Vim dolorum definiebas
            an. Mei ex natum rebum iisque.
          </p>
          <div className="actions ui centered two column grid">
            <button
              onClick={() => {
                handleClick();
              }}
              className="ui button blue"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
