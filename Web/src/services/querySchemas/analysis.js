import gql from "graphql-tag";

export const getTeamAnalysis = gql`
  query teamAnalysis($teamId: Int) {
    teamAnalysis(teamId: $teamId) {
      id
      lastUpdated
      leagueRank
      leagueHomeRank
      leagueRoadRank
      leagueL10Rank
      ppLeagueRank
      divisionRank
      divisionHomeRank
      divisionRoadRank
      divisionL10Rank
      ppDivisionRank
      points
      regularSeasonStatRankings {
        wins
        losses
        ot
        pts
        ptPctg
        goalsPerGame
        goalsAgainstPerGame
        evGGARatio
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
        powerPlayPercentage
        penaltyKillPercentage
        shotsPerGame
        shotsAllowed
        winScoreFirst
        winOppScoreFirst
        winLeadFirstPer
        winLeadSecondPer
        winOutshootOpp
        winOutshotByOpp
        faceOffsTaken
        faceOffsWon
        faceOffsLost
        faceOffWinPercentage
        shootingPctRank
        savePctRank
      }
      statsSingleSeason {
        wins
        losses
        ot
        pts
        ptPctg
        goalsPerGame
        goalsAgainstPerGame
        evGGARatio
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
        powerPlayPercentage
        penaltyKillPercentage
        shotsPerGame
        shotsAllowed
        winScoreFirst
        winOppScoreFirst
        winLeadFirstPer
        winLeadSecondPer
        winOutshootOpp
        winOutshotByOpp
        faceOffsTaken
        faceOffsWon
        faceOffsLost
        faceOffWinPercentage
        shootingPctg
        savePctg
      }
      team {
        name
        colorScheme
      }
      lines {
        goalies {
          starter { id, number, name }
          backup { id, number, name }
        }
        lines {
          leftDefender { id, number, name }
          rightDefender { id, number, name }
          leftWing { id, number, name }
          center { id, number, name }
          rightWing { id, number, name }
        }
        ppLines {
          leftDefender { id, number, name }
          rightDefender { id, number, name }
          leftWing { id, number, name }
          center { id, number, name }
          rightWing { id, number, name }
        }
      }
      rosterStats {
        id
        abbrName
        fullName
        currentAge
        positionName
        primaryNumber
        nationality
        stats {
          games
          wins
          shutouts
          goals
          assists
          points
          plusMinus
        }
      }
      skaterStats {
        id
        fullName
        stats {
          games
          goals
          assists
          points
          plusMinus
          timeOnIce
          shots
          hits
          blocked
          powerPlayGoals
          powerPlayPoints
          powerPlayTimeOnIce
          evenTimeOnIce
          penaltyMinutes
          faceOffPct
          shotPct
          gameWinningGoals
          overTimeGoals
          shortHandedGoals
          shortHandedTimeOnIce
          shifts
          timeOnIcePerGame
          shortHandedTimeOnIcePerGame
          powerPlayTimeOnIcePerGame
        }
        advancedStats {
          seasonId
          playerId
          skaterFullName
          positionCode
          assists5v5
          assistsPer605v5
          gamesPlayed
          goals5v5
          goalsPer605v5
          netMinorPenaltiesPer60
          offensiveZoneStartPct5v5
          onIceShootingPct5v5
          points5v5
          pointsPer605v5
          primaryAssists5v5
          primaryAssistsPer605v5
          satPct
          satRelative5v5
          secondaryAssists5v5
          secondaryAssistsPer605v5
          shootingPct5v5
          timeOnIcePerGame5v5
          ppAssists
          ppGoals
          ppGoalsForPer60
          ppGoalsPer60
          ppIndividualSatFor
          ppIndividualSatForPer60
          ppPoints
          ppPointsPer60
          ppPrimaryAssists
          ppPrimaryAssistsPer60
          ppSecondaryAssists
          ppSecondaryAssistsPer60
          ppShootingPct
          ppShots
          ppShotsPer60
          ppTimeOnIce
          ppTimeOnIcePctPerGame
          ppTimeOnIcePerGame
        }
      }
      goalieStats {
        id
        fullName
        stats {
          timeOnIce
          ot
          shutouts
          wins
          losses
          saves
          powerPlaySaves
          shortHandedSaves
          evenSaves
          shortHandedShots
          evenShots
          powerPlayShots
          savePercentage
          goalAgainstAverage
          games
          gamesStarted
          shotsAgainst
          goalsAgainst
          powerPlaySavePercentage
          shortHandedSavePercentage
          evenStrengthSavePercentage
        }
        advancedStats {
          seasonId
          playerId
          goalieFullName
          gamesPlayed
          completeGamePct
          completeGames
          gamesStarted
          goalieFullName
          goalsAgainst
          goalsAgainstAverage
          goalsFor
          goalsForAverage
          incompleteGames
          qualityStart
          qualityStartsPct
          regulationLosses
          regulationWins
          savePct
          shootsCatches
          shotsAgainstPer60
          teamAbbrevs
          timeOnIce
        }
      }
    }
  }
`;
//
export const getAnalysis = gql`
  query analysis {
    analysis {
      id
      lastUpdated
      leagueRank
      leagueHomeRank
      leagueRoadRank
      leagueL10Rank
      ppLeagueRank
      divisionRank
      divisionHomeRank
      divisionRoadRank
      divisionL10Rank
      ppDivisionRank
      points
      regularSeasonStatRankings {
        wins
        losses
        ot
        pts
        ptPctg
        goalsPerGame
        goalsAgainstPerGame
        evGGARatio
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
        powerPlayPercentage
        penaltyKillPercentage
        shotsPerGame
        shotsAllowed
        winScoreFirst
        winOppScoreFirst
        winLeadFirstPer
        winLeadSecondPer
        winOutshootOpp
        winOutshotByOpp
        faceOffsTaken
        faceOffsWon
        faceOffsLost
        faceOffWinPercentage
        shootingPctRank
        savePctRank
      }
      statsSingleSeason {
        wins
        losses
        ot
        pts
        ptPctg
        goalsPerGame
        goalsAgainstPerGame
        evGGARatio
        powerPlayPercentage
        powerPlayGoals
        powerPlayGoalsAgainst
        powerPlayOpportunities
        powerPlayPercentage
        penaltyKillPercentage
        shotsPerGame
        shotsAllowed
        winScoreFirst
        winOppScoreFirst
        winLeadFirstPer
        winLeadSecondPer
        winOutshootOpp
        winOutshotByOpp
        faceOffsTaken
        faceOffsWon
        faceOffsLost
        faceOffWinPercentage
        shootingPctg
        savePctg
      }
      team {
        name
        colorScheme
      }
      rosterStats {
        id
        abbrName
        fullName
        currentAge
        positionName
        primaryNumber
        nationality
        stats {
          games
          wins
          shutouts
          goals
          assists
          points
          plusMinus
        }
      }
    }
  }
`;
