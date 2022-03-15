import React, { useEffect, useState } from "react";
import { Button, Dropdown, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import * as actions from "services/game";
import * as teamActions from "services/team";
import { getLogo } from "util/assets";
import config from "util/config.json";
import { selectGameList } from "services/selectors";

import GameList from "./GameList";
import GameListStatistics from "./GameListStatistics";

const GameListFilterStyled = styled(Segment)`
  .ui.dropdown.search {
    min-width: 15vw;
  }
`;

const DropdownStyled = styled(Dropdown)`
  margin-right: 1vw;
`;

export default function GameSelection() {
  const [team, setTeam] = useState(-1);
  const [opponent, setOpponent] = useState(-1);
  const [season, setSeasonId] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(teamActions.getDropdownTeams());
  }, []);

  const { gamesBetweenTeams, dropdownTeams } = useSelector(selectGameList);

  return (
    <>
      <GameListFilterStyled>
        {dropdownTeams && (
          <>
            <DropdownStyled
              placeholder="Team"
              selection
              search
              onChange={(_event, data) => setTeam(data.value)}
              options={dropdownTeams.map((el) => {
                return {
                  key: el.id,
                  text: el.name,
                  value: el.id,
                  image: { avatar: true, src: getLogo(el.id) },
                };
              })}
            />
            <DropdownStyled
              placeholder="Opponent"
              selection
              search
              onChange={(_event, data) => setOpponent(data.value)}
              options={dropdownTeams.map((el) => {
                return {
                  key: el.id,
                  text: el.name,
                  value: el.id,
                  image: { avatar: true, src: getLogo(el.id) },
                };
              })}
            />
          </>
        )}
        <DropdownStyled
          placeholder="Season"
          selection
          onChange={(_event, data) => setSeasonId(data.value)}
          options={config.seasons.concat({
            value: undefined,
            key: "all",
            text: "All seasons",
          })}
        />
        <Button
          onClick={() => dispatch(actions.findGames(team, opponent, season))}
        >
          Search
        </Button>
      </GameListFilterStyled>
      <Segment>
        {gamesBetweenTeams && (
          <GameListStatistics gamesBetweenTeams={gamesBetweenTeams} />
        )}
        <GameList />
      </Segment>
    </>
  );
}
