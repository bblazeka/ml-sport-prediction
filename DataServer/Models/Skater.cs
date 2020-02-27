﻿using DataServer.Mediators;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.Models
{
    public class Skater : Player
    {
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Pim { get; set; }
        public int Shots { get; set; }
        public int Games { get; set; }
        public int PlusMinus { get; set; }
        public int Points { get; set; }
        public int Hits { get; set; }
        public int GameWinningGoals { get; set; }
        public int OverTimeGoals { get; set; }
        public int Blocked { get; set; }
        public float FaceoffPct { get; set; }
        public float ShotPct { get; set; }
        public int PowerPlayGoals { get; set; }
        public int PowerPlayPoints { get; set; }
        public string PowerPlayTimeOnIce { get; set; }
        public string TimeOnIce { get; set; }
        public int ShortHandedGoals { get; set; }
        public int ShortHandedPoints { get; set; }
        public string ShortHandedTimeOnIce { get; set; }

        public Skater() : base()
        {
        }

        public Skater(int id) : base(id)
        {
            if (id != 0)
            {
                string answer = ApiMediator.SendRequest(RequestBuilder(id, "20192020"));
                ParseAnswer(answer);

            }
        }

        public new void ApiLoad(JToken jsonObject)
        {
            var stats = jsonObject;
            try
            {
                Goals = int.Parse(stats["goals"].ToString());
                Assists = int.Parse(stats["assists"].ToString());
                Pim = int.Parse(stats["penaltyMinutes"].ToString());
                Shots = int.Parse(stats["shots"].ToString());
                PlusMinus = int.Parse(stats["plusMinus"].ToString());
                TimeOnIce = stats["timeOnIce"].ToString();
                Hits = int.Parse(stats["hits"].ToString());
                Blocked = int.Parse(stats["blocked"].ToString());
                /*FaceoffPct = float.Parse(stats["faceOffPct"].ToString());
                ShortHandedGoals = int.Parse(stats["shortHandedGoals"].ToString());
                ShortHandedPoints = int.Parse(stats["shortHandedPoints"].ToString());
                ShortHandedTimeOnIce = stats["shortHandedTimeOnIce"].ToString();
                PowerPlayGoals = int.Parse(stats["powerPlayGoals"].ToString());
                PowerPlayPoints = int.Parse(stats["powerPlayPoints"].ToString());
                PowerPlayTimeOnIce = stats["powerPlayTimeOnIce"].ToString();*/
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                Pim = 0;
                Goals = 0;
                Assists = 0;
                Points = 0;
                Games = 0;
            }
        }

        public void ParseAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
            try
            {
                var stats = jsonObject["stats"][0]["splits"][0]["stat"];
                Goals = int.Parse(stats["goals"].ToString());
                Assists = int.Parse(stats["assists"].ToString());
                Pim = int.Parse(stats["pim"].ToString());
                Shots = int.Parse(stats["shots"].ToString());
                Games = int.Parse(stats["games"].ToString());
                PlusMinus = int.Parse(stats["plusMinus"].ToString());
                Points = int.Parse(stats["points"].ToString());
                GameWinningGoals = int.Parse(stats["gameWinningGoals"].ToString());
                OverTimeGoals = int.Parse(stats["overTimeGoals"].ToString());
                TimeOnIce = stats["timeOnIce"].ToString();
                Hits = int.Parse(stats["hits"].ToString());
                Blocked = int.Parse(stats["blocked"].ToString());
                FaceoffPct = float.Parse(stats["faceOffPct"].ToString());
                ShotPct = float.Parse(stats["shotPct"].ToString());
                ShortHandedGoals = int.Parse(stats["shortHandedGoals"].ToString());
                ShortHandedPoints = int.Parse(stats["shortHandedPoints"].ToString());
                ShortHandedTimeOnIce = stats["shortHandedTimeOnIce"].ToString();
                PowerPlayGoals = int.Parse(stats["powerPlayGoals"].ToString());
                PowerPlayPoints = int.Parse(stats["powerPlayPoints"].ToString());
                PowerPlayTimeOnIce = stats["powerPlayTimeOnIce"].ToString();
            }
            catch (Exception)
            {
                Pim = 0;
                Goals = 0;
                Assists = 0;
                Points = 0;
                Games = 0;
            }
        }

        public static string RequestBuilder(long id, string season)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}/stats?stats=statsSingleSeason&season={1}", id, season);
        }
    }
}
