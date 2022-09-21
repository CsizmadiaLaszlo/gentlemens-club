using System.Collections;
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

}