﻿using DbServices.Services;
using System;
using System.Collections.Generic;
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
    /// Interaction logic for LeaguePage.xaml
    /// </summary>
    public partial class LeaguePage : BasePage
    {
        private LeagueService m_dbService;
        public LeaguePage()
        {
            InitializeComponent();
            m_dbService = new LeagueService();
            LeagueCb.ItemsSource = m_dbService.GetLeagues();
        }

        public override void Refresh()
        {
            LeagueCb.ItemsSource = m_dbService.GetLeagues();
        }

        private void LeagueCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            TeamDataGrid.ItemsSource = m_dbService.GetLeagueTeams(((ComboBox)sender).SelectedItem, LeagueSeasonCb.SelectedItem.ToString());

        }

        private void LeagueSeasonCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (LeagueCb.SelectedItem != null)
            {
                TeamDataGrid.ItemsSource = m_dbService.GetLeagueTeams(LeagueCb.SelectedItem, (((ComboBox)sender).SelectedItem).ToString());
            }
        }

        private void BtnAddLeague_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.InsertLeague(TbLeagueId.Text, ShortTb.Text, TbLeagueName.Text);
            RaiseStatusChange(string.Format("INSERT {0} {1}", ShortTb.Text, TbLeagueName.Text), res);
        }
    }
}
