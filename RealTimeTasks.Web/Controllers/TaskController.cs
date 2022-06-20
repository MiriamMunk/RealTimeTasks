using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly string _ConnString;
        private readonly IHubContext<TaskHub> _context;

        public TaskController(IConfiguration con, IHubContext<TaskHub> context)
        {
            _ConnString = con.GetConnectionString("ConStr");
            _context = context;
        }

        [Authorize]
        [Route("addTask")]
        [HttpPost]
        public void AddTask(Task task)
        {
            TaskRepository repo = new(_ConnString);
            repo.AddTask(task);
            _context.Clients.All.SendAsync("getTasks", repo.GetTasks());
        }

        [Authorize]
        [Route("getTasks")]
        [HttpGet]
        public void GetTasks()
        {
            TaskRepository repo = new(_ConnString);
            _context.Clients.All.SendAsync("getTasks", repo.GetTasks());
        }

        [Route("startTask")]
        [HttpPost]
        public void StartTask(Task task)
        {
            TaskRepository repo = new(_ConnString);
            repo.StartTask(task, repo.GetByEmail(User.Identity.Name));
            _context.Clients.All.SendAsync("getTasks", repo.GetTasks());
        }

        [Route("taskCompleted")]
        [HttpPost]
        public void TaskCompleted(Task task)
        {
            TaskRepository repo = new(_ConnString);
            repo.DeleteTask(task);
            _context.Clients.All.SendAsync("getTasks", repo.GetTasks());
        }
    }
}
