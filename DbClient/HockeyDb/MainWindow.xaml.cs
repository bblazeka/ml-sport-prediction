﻿using HockeyDb.Services;
using HockeyDb.ViewModels;
using HockeyDb.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HockeyDb
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private DatabaseService m_dbService;
        public MainWindow()
        {
            InitializeComponent();
            m_dbService = new DatabaseService();

            frame.Content = new HomePage();

            Application.Current.MainWindow = this;
        }

        public void setLabel(string text)
        {
            this.lblStatus.Content = text;
        }

        private void btnPlayers_Click(object sender, RoutedEventArgs e)
        {
            PlayerPage page = new PlayerPage();
            page.statusChange += MainWindow_statusChange;
            frame.Content = page;
        }

        private void btnLeague_Click(object sender, RoutedEventArgs e)
        {
            LeaguePage page = new LeaguePage();
            page.statusChange += MainWindow_statusChange;
            frame.Content = page;
        }

        private void btnTeams_Click(object sender, RoutedEventArgs e)
        {
            TeamPage page = new TeamPage();
            page.statusChange += MainWindow_statusChange;
            frame.Content = page;
        }

        private void btnHome_Click(object sender, RoutedEventArgs e)
        {
            HomePage page = new HomePage();
            page.statusChange += MainWindow_statusChange;
            frame.Content = page;
        }

        private void btnRefresh_Click(object sender, RoutedEventArgs e)
        {
            ((BasePage)frame.Content).Refresh();
        }

        private void MainWindow_statusChange(string sampleParam, int value)
        {
            lblStatus.Content = (value > 0) ? string.Format("Success: {0}", sampleParam) : string.Format("Failure: {0}", sampleParam);
        }
    }
}
