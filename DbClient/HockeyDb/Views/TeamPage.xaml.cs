﻿using HockeyDb.Services;
using HockeyDb.ViewModels;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HockeyDb.Views
{
    /// <summary>
    /// Interaction logic for TeamPage.xaml
    /// </summary>
    public partial class TeamPage : BasePage
    {
        private TeamService m_dbService;
        public TeamPage()
        {
            InitializeComponent();
            m_dbService = new TeamService();
            Refresh();
        }

        public override void Refresh()
        {
            TeamCb.ItemsSource = m_dbService.GetTeams();
            TeamsCb.ItemsSource = m_dbService.GetTeams();
            LeagueCb.ItemsSource = m_dbService.GetLeagues();
            TeamNationCb.ItemsSource = m_dbService.GetNations();
        }

        private void InsertBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.InsertTeam(TeamIdTb.Text, TeamNameTb.Text, TeamNationCb.Text);
            RaiseStatusChange(string.Format("{0} {1}", TeamNameTb.Text, TeamNationCb.Text), res);
        }

        private void UpdateLeagueBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.UpdateLeague(Convert.ToInt32(TeamIdTb.Text), TeamNameTb.Text, LeagueCb.SelectedItem as LeagueViewModel, Convert.ToInt32(SeasonCb.Text));
            RaiseStatusChange(string.Format("{0} {1} {2}", TeamNameTb.Text, LeagueCb.Text, SeasonCb.Text), res);
        }

        private void DeleteLeagueBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.DeleteLeague(Convert.ToInt32(TeamIdTb.Text), TeamNameTb.Text, LeagueCb.SelectedItem as LeagueViewModel, Convert.ToInt32(SeasonCb.Text));
            RaiseStatusChange(string.Format("{0} {1} {2}", TeamNameTb.Text, LeagueCb.Text, SeasonCb.Text), res);
        }

        private void TeamCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            RosterDataGrid.ItemsSource = m_dbService.GetPlayers(((ComboBox)sender).SelectedItem, TeamSeasonCb.SelectedItem.ToString()).FindAll(p => p.Position != "G");
            GoaliesDataGrid.ItemsSource = m_dbService.GetPlayers(((ComboBox)sender).SelectedItem, TeamSeasonCb.SelectedItem.ToString()).FindAll(p => p.Position == "G");
            TeamLogoImg.Source = LoadImage((((ComboBox)sender).SelectedItem as TeamViewModel).TeamLogo);
        }

        private void TeamSeasonCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (TeamCb.SelectedItem != null)
            {
                List<PlayerViewModel> players = m_dbService.GetPlayers(TeamCb.SelectedItem, ((ComboBox)sender).SelectedItem.ToString());
                
                RosterDataGrid.ItemsSource = players.FindAll(p => p.Position != "G");
                GoaliesDataGrid.ItemsSource = players.FindAll(p => p.Position == "G");

                lineupTextBlock.Text = "Projected lineup:\n";
                int lineCounter = 0;
                foreach(PlayerViewModel pvm in PlayerService.GetLineup(players))
                {
                    if (lineCounter == 5)
                    {
                        lineCounter = 0;
                        lineupTextBlock.Text += "\n";
                    }
                    lineupTextBlock.Text += string.Format("#{0} {1}\n", pvm.Nr.ToString(), pvm.FullName.ToString());
                    lineCounter++;
                }
            }
        }

        private void UpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == true)
            {
                var res = m_dbService.UpdateTeamLogo(openFileDialog.FileName, TeamIdTb.Text, TeamNameTb.Text);
                RaiseStatusChange(string.Format("{0} image update", TeamNameTb.Text), res);
            }

        }

        private static BitmapImage LoadImage(byte[] imageData)
        {
            if (imageData == null || imageData.Length == 0) return null;
            var image = new BitmapImage();
            using (var mem = new MemoryStream(imageData))
            {
                mem.Position = 0;
                image.BeginInit();
                image.CreateOptions = BitmapCreateOptions.PreservePixelFormat;
                image.CacheOption = BitmapCacheOption.OnLoad;
                image.UriSource = null;
                image.StreamSource = mem;
                image.EndInit();
            }
            image.Freeze();
            return image;
        }

        private void TeamsCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var team = (((ComboBox)sender).SelectedItem as TeamViewModel);
            TeamIdTb.Text = team.TeamId.ToString();
            TeamNameTb.Text = team.TeamName;
            TeamNationCb.Text = team.Country;
        }

        private void TabControl_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }
    }
}
