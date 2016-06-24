/* global Windows */

import React from 'react';
import ReactWinJS from 'react-winjs';
import { connect } from 'react-redux';

import i18n from '../../i18n';

import { updateInputText, toggleExpanded, switchIme } from '../../actions/home';
import { playInputText } from '../../actions/textToSpeech';

const InputToolbar = ({
  inputLang, outputLang,
  inputExpanded, ttsPlaying,
  onClearButtonClick, onListenButtonClick,
  onExpandButtonClick, onWriteButtonClick,
}) => {
  const tileExisted = Windows.UI.StartScreen.SecondaryTile.exists(
    `${inputLang}_${outputLang}`
  );

  return (
    <div className="app-toolbar-container">
      <ReactWinJS.ToolBar>
        <ReactWinJS.ToolBar.Button
          key="clearAll"
          icon=""
          label={i18n('clear-all')}
          onClick={onClearButtonClick}
        />
        <ReactWinJS.ToolBar.Button
          key="listen"
          icon={ttsPlaying ? '' : ''}
          label={i18n('listen')}
          onClick={onListenButtonClick}
        />
        <ReactWinJS.ToolBar.Button
          key="speak"
          icon="microphone"
          label={i18n('speak')}
        />
        <ReactWinJS.ToolBar.Button
          key="write"
          icon=""
          label={i18n('write')}
          onClick={onWriteButtonClick}
        />
        <ReactWinJS.ToolBar.Button
          key="capture"
          icon="camera"
          label={i18n('capture')}
        />
        <ReactWinJS.ToolBar.Button
          key="openFromGallery"
          icon=""
          label={i18n('open-from-gallery')}
        />
        <ReactWinJS.ToolBar.Button
          key="expand"
          icon={inputExpanded ? '' : ''}
          label={inputExpanded ? i18n('collapse') : i18n('expand')}
          onClick={onExpandButtonClick}
        />
        <ReactWinJS.ToolBar.Button
          key="pinLanguagePair"
          section="secondary"
          label={
            tileExisted ? i18n('unpin-language-pair')
                        : i18n('pin-language-pair')
          }
        />
      </ReactWinJS.ToolBar>
    </div>
  );
};

InputToolbar.propTypes = {
  inputLang: React.PropTypes.string.isRequired,
  outputLang: React.PropTypes.string.isRequired,
  inputExpanded: React.PropTypes.bool.isRequired,
  ttsPlaying: React.PropTypes.bool.isRequired,
  onClearButtonClick: React.PropTypes.func.isRequired,
  onListenButtonClick: React.PropTypes.func.isRequired,
  onExpandButtonClick: React.PropTypes.func.isRequired,
  onWriteButtonClick: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inputLang: state.settings.inputLang,
  outputLang: state.settings.outputLang,
  inputExpanded: state.home.inputExpanded,
  ttsPlaying: state.textToSpeech.ttsPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  onClearButtonClick: () => {
    dispatch(updateInputText(''));
  },
  onListenButtonClick: () => {
    dispatch(playInputText());
  },
  onExpandButtonClick: () => {
    dispatch(toggleExpanded());
  },
  onWriteButtonClick: () => {
    dispatch(switchIme('handwriting'));
  },
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(InputToolbar);
