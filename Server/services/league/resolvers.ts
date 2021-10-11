import { sortBy, uniqBy } from "lodash";
import { nhlApiRequest } from "../../adapters/apihandler";

import { Database } from "../../adapters/dbhandler";
import * as team from "../team";
import { calculateGameScore, mapApiDivision } from "./functions";

let db = new Database();

function init(database) {
  db = database;
}

type TGetStandingsParams = {
  season: string;
};

async function getStandings({ season }: TGetStandingsParams) {
  const records = await nhlApiRequest(`/api/v1/standings?season=${season}`);
  return records.records;
}

type TGetScheduleParams = {
  start: string;
  end: string;
};

async function getSchedule({ start, end }: TGetScheduleParams) {
  const teams = await team.getActiveTeams();
  const sortedTeams = sortBy(teams, ["name"]) as TScheduleTeam[];

  const games = await db
    .getCollection("games")
    .find({
      date: {
        $gte: `${start}`,
        $lte: `${end}`,
      },
      gameType: "R",
    })
    .toArray();
  for (let team of sortedTeams) {
    team.scheduleScore = 0;
    team.games = JSON.parse(JSON.stringify(games))
      .filter((g) => g.home.team.id === team.id || g.away.team.id === team.id)
      .map((el) => {
        el.opponent = el.home.team.id === team.id ? el.away : el.home;
        const score = calculateGameScore(el.opponent);
        el.opponent.rating = Math.round((score + Number.EPSILON) * 100) / 100;
        team.scheduleScore += score;
        return el;
      });
    team.scheduleScore =
      Math.round((team.scheduleScore + Number.EPSILON) * 100) / 100;
    team.avgScheduleScore =
      Math.round(
        (team.scheduleScore / team.games.length + Number.EPSILON) * 100
      ) / 100;
  }
  return sortedTeams;
}

async function divisionsWithTeams() {
  const teams = await team.getActiveTeams();

  const divisions = teams.map((i) => i.division);
  const uniqueDivisions = uniqBy(divisions, "id") as TApiDivision[];
  const divisionsWithTeams = uniqueDivisions.map(mapApiDivision);

  teams.forEach((t) => {
    divisionsWithTeams
      .find((div) => div.name === t.division.name)
      .teams.push(t);
  });
  return divisionsWithTeams;
}

export { init, getSchedule, getStandings, divisionsWithTeams };
