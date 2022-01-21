import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Dropdown, Search } from "semantic-ui-react";

import { IsNullOrUndefined } from "util/common";
import { Loader, QuestionModal } from "components";
import * as actions from "services/player";
import { selectSelectedPlayers } from "services/selectors";

import "./PlayerList.scss";
import config from "util/config.json";
import CompareGrid from "./CompareGrid/CompareGrid";

export default function PlayerList() {
  const [isLoading, setLoading] = useState(false);
  const [statsMode, setStatsMode] = useState("stats");
  const [seasonId, setSeasonId] = useState(config.currentSeason);
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { selectedPlayers, suggestions } = useSelector(selectSelectedPlayers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getSelectedPlayers(seasonId));
  }, [dispatch, seasonId]);

  const onRemoveAll = () => {
    dispatch(actions.removeAllPlayers(seasonId));
  };

  const checkedChanged = (e, { checked }) => {
    setStatsMode(checked ? "averageStats" : "stats");
  };

  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    setValue(value);

    if (value.length < 1 && value.length < 1) {
      setLoading(false);
      setValue("");
    }

    if (value.length > 2) {
      dispatch(actions.searchBasicPlayer(value));
    } else {
      setLoading(false);
    }
  };

  const handleResultSelect = (e, { result }) => {
    setValue("");
    setLoading(false);
    dispatch(actions.addPlayer(result.id, seasonId));
  };

  if (IsNullOrUndefined(selectedPlayers) || selectedPlayers.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <div className="head-options-container">
        <Search
          className="search-box"
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={suggestions}
          size="large"
          value={value}
        />
        <QuestionModal
          onOpen={() => {
            setModalOpen(true);
          }}
          onClose={(e, status) => {
            if (status) {
              onRemoveAll();
            }
            setModalOpen(false);
          }}
          open={modalOpen}
          trigger={<Button className="clear-button">Clear players</Button>}
        />
        <Dropdown
          header="Season"
          selection
          onChange={(_event, data) => setSeasonId(data.value)}
          defaultValue={config.currentSeason}
          options={config.seasons}
        />
        <Checkbox
          className="player-list-checkbox"
          toggle
          label="Average stats"
          onChange={checkedChanged}
        />
      </div>
      {selectedPlayers.skaters.length > 0 && (
        <CompareGrid
          players={selectedPlayers.skaters}
          skater={true}
          statsSelector={statsMode}
          onDelete={(id) => dispatch(actions.deletePlayer(id, seasonId))}
        />
      )}
      {selectedPlayers.goalies.length > 0 && (
        <CompareGrid
          players={selectedPlayers.goalies}
          skater={false}
          statsSelector="stats"
          onDelete={(id) => dispatch(actions.deletePlayer(id, seasonId))}
        />
      )}
    </>
  );
}
