export const getBasicPlayer = /* GraphQL */ `
  query player($id: Int) {
    player(id: $id) {
      id
      fullName
      primaryPosition {
        code
        name
        type
      }
      currentTeam {
        id
        name
      }
    }
  }
`;

export const getBasicPlayerByName = /* GraphQL */ `
  query searchPlayerByName($name: String) {
    searchPlayerByName(name: $name) {
      id
      fullName
      primaryPosition {
        code
        name
        type
      }
      currentTeam {
        id
        name
      }
    }
  }
`;

export const getSkater = /* GraphQL */ `
  query player($id: Int) {
    player(id: $id) {
      id
      jerseyNumber
      fullName
      currentAge
      description
      nationality
      birthCity
      birthDate
      capHit
      primaryPosition {
        code
        name
        type
      }
      currentTeam {
        id
        name
      }
      careerStats {
        stats {
          season
          team {
            id
            name
          }
          league {
            id
            name
          }
          stat {
            games
            goals
            assists
            points
            penaltyMinutes
            plusMinus
          }
        }
      }
      nhlStats {
        totalGames
        totalGoals
        totalAssists
        totalPoints
        seasonSums {
          season
          goals
          assists
        }
        stats {
          season
          team {
            id
            name
          }
          stat {
            games
            goals
            assists
            points
            penaltyMinutes
            plusMinus
            timeOnIce
            faceOffPct
            shots
            hits
            blocked
            evenTimeOnIce
            powerPlayTimeOnIce
            shortHandedTimeOnIce
            shotPct
            gameWinningGoals
            powerPlayGoals
            powerPlayPoints
            shortHandedGoals
            shortHandedPoints
          }
        }
      }
    }
  }
`;

export const getGoalie = /* GraphQL */ `
  query player($id: Int) {
    player(id: $id) {
      id
      jerseyNumber
      fullName
      currentAge
      nationality
      description
      birthCity
      birthDate
      capHit
      primaryPosition {
        code
        name
        type
      }
      currentTeam {
        id
        name
      }
      careerStats {
        stats {
          season
          team {
            id
            name
          }
          league {
            id
            name
          }
          stat {
            games
            goalAgainstAverage
            savePercentage
            wins
            losses
            ot
          }
        }
      }
      nhlStats {
        totalGames
        totalGamesStarted
        totalWins
        seasonSums {
          season
          games
          wins
        }
        stats {
          season
          team {
            id
            name
          }
          stat {
            games
            gamesStarted
            goalAgainstAverage
            savePercentage
            wins
            losses
            ot
            evenSaves
            powerPlaySaves
            shortHandedSaves
            shotsAgainst
            evenShots
            powerPlayShots
            shortHandedShots
            evenStrengthSavePercentage
            powerPlaySavePercentage
            shortHandedSavePercentage
            shutouts
            timeOnIce
          }
        }
      }
    }
  }
`;

export const skaterStatsFragment = /* GraphQL */ `
  fragment SkaterStatsFragment on Player {
    stats {
      games
      goals
      assists
      points
      pim
      plusMinus
      faceOffPct
      shots
      hits
      blocked
      timeOnIce
      evenTimeOnIce
      evenTimeOnIceMinutes
      powerPlayTimeOnIce
      powerPlayTimeOnIceMinutes
      shortHandedTimeOnIce
      shortHandedTimeOnIceMinutes
      shotPct
      gameWinningGoals
      powerPlayGoals
      powerPlayPoints
      shortHandedGoals
      shortHandedPoints
    }
  }
`;

export const getSelectedPlayers = /* GraphQL */ `
  query player($playerIds: String, $seasonId: Int, $projectedStats: Boolean) {
    selectedPlayers(
      playerIds: $playerIds
      seasonId: $seasonId
      projectedStats: $projectedStats
    ) {
      skaters {
        id
        fullName
        currentTeam {
          id
          name
        }
        primaryPosition {
          abbreviation
        }
        ...SkaterStatsFragment
        averageStats {
          goals
          assists
          points
          shots
          hits
          blocked
          powerPlayGoals
          powerPlayPoints
          shortHandedGoals
          shortHandedPoints
          gameWinningGoals
        }
      }
      goalies {
        id
        fullName
        currentTeam {
          id
          name
        }
        primaryPosition {
          abbreviation
        }
        stats {
          games
          gamesStarted
          goalAgainstAverage
          savePercentage
          wins
          losses
          ot
          saves
          evenSaves
          powerPlaySaves
          shortHandedSaves
          shotsAgainst
          evenShots
          powerPlayShots
          shortHandedShots
          evenStrengthSavePercentage
          powerPlaySavePercentage
          shortHandedSavePercentage
          shutouts
          timeOnIce
        }
        averageStats {
          saves
        }
      }
    }
  }
  ${skaterStatsFragment}
`;
