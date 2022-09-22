﻿using System.Collections;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using GentlemensClub.Models.Stocks;
using GentlemensClub.Models.TodayStatistic;
using GentlemensClub.Models.WeeklyStatistics;
using GentlemensClub.Models.YearlyStatistics;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GentlemensClub.Services;

public class ApiHandlerStockService : IStockApiService
{
    private readonly string _apiKey;

    public ApiHandlerStockService(IConfiguration configuration)
    {
        _apiKey = configuration.GetValue<string>("ApiKey");
    }
    private async Task<T> GetDataByUrl<T>(string apiURL)
    {
        using (HttpClient client = new HttpClient())
        {
            client.BaseAddress = new Uri(apiURL);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiURL);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var statistics = JsonConvert.DeserializeObject<T>(data);
                return statistics;
            }
        }

        throw new NotImplementedException();
    }

    public async Task<IEnumerable> Stock(int? page = 1)
    {
        var stocks =
            await GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&page={page}&api_token={_apiKey}");
        var stockList = stocks.Data;
        return stockList;
    }

    public async Task<IEnumerable> StockInfo(string? symbol)
    {
        var stockInfo =
            (await GetDataByUrl<TodayStatistic>(
                $"https://api.stockdata.org/v1/data/quote?symbols={symbol}&api_token={_apiKey}")).Data;
        var todayInfo = stockInfo.Select(x => x);
        return todayInfo;
    }

    public async Task<IEnumerable> WeeklyStatistics(string? symbol)
    {
        var stockInfo =
            (await GetDataByUrl<WeeklyStatistics>(
                $"https://api.stockdata.org/v1/data/intraday?symbols={symbol}&api_token={_apiKey}")).Data;
        var weeklyInfo = stockInfo.Select(x => x);
        return weeklyInfo;
    }

    public async Task<IEnumerable> YearlyStatistics(string? symbol)
    {
        var stockInfo =
            (await GetDataByUrl<YearlyStatistics>(
                $"https://api.stockdata.org/v1/data/eod?symbols={symbol}&api_token={_apiKey}")).Data;
        var yearlyInfo = stockInfo.Select(x => x);
        return yearlyInfo;
    }

    public async Task<IEnumerable> MaxPage()
    {
        var endpoints = (await GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&api_token={_apiKey}")).Meta;
        var maxPage = endpoints.Found / endpoints.Limit + 1;
        Dictionary<string, int> maxPageList = new Dictionary<string, int>();
        maxPageList.Add("maxPage", maxPage);
        return maxPageList;
    }
}