import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header, Table } from "semantic-ui-react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import {getTeamLocations} from "reducers/teamActions";
import { Loader } from "components";
import { LogoStyled } from "components/collection";
import routes from "routes";
import { getLogo } from "util/assets";
import { selectLocations } from "reducers/selectors";
import config from "util/config.json";

import LocationsDisplay from "./LocationsDisplay";
import { getStandings } from "services/querySchemas/league";

const StandingsContainer = styled(Grid.Column)`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const RankCell = styled(Table.Cell)`
  font-size: 2em;
  font-weight: bold;
`;

const TeamNameCell = styled(Table.Cell)`
  font-size: 1.5em;
`;

const PointsCell = styled(Table.Cell)`
  font-weight: bold;
`;

export default function Standings() {
  const { loading, data } = useQuery(getStandings, {variables: { season: config.currentSeason }});
  const { locations } = useSelector(selectLocations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamLocations());
  }, []);

  if (loading) {
    return <Loader text="Loading standings..."></Loader>;
  }
  const { standings } = data;

  return (
    <>
      <Grid columns={2} stackable>
        {standings &&
          standings.map((entry) => {
            return (
              <StandingsContainer key={entry.division.id}>
                <Header as="h3">{entry.division.name}</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Rank</Table.HeaderCell>
                      <Table.HeaderCell>Logo</Table.HeaderCell>
                      <Table.HeaderCell>Team</Table.HeaderCell>
                      <Table.HeaderCell>GP</Table.HeaderCell>
                      <Table.HeaderCell>W</Table.HeaderCell>
                      <Table.HeaderCell>L</Table.HeaderCell>
                      <Table.HeaderCell>OT</Table.HeaderCell>
                      <Table.HeaderCell>GS</Table.HeaderCell>
                      <Table.HeaderCell>GA</Table.HeaderCell>
                      <Table.HeaderCell>PTS</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {entry.teamRecords.map((record) => {
                      return (
                        <Table.Row key={`row${record.team.id}`}>
                          <RankCell>{record.divisionRank}</RankCell>
                          <Table.Cell>
                            <Link to={`${routes.teams}/${record.team.id}`}>
                              <LogoStyled
                                src={getLogo(record.team.id)}
                                alt={`img${record.team.Id}`}
                              />
                            </Link>
                          </Table.Cell>
                          <TeamNameCell>
                            <Link to={`${routes.teams}/${record.team.id}`}>
                              {record.team.name}
                            </Link>
                          </TeamNameCell>
                          <Table.Cell>{record.gamesPlayed}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.wins}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.losses}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.ot}</Table.Cell>
                          <Table.Cell>{record.goalsScored}</Table.Cell>
                          <Table.Cell>{record.goalsAgainst}</Table.Cell>
                          <PointsCell>{record.points}</PointsCell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </StandingsContainer>
            );
          })}
      </Grid>
      <LocationsDisplay locations={locations} />
    </>
  );
}
