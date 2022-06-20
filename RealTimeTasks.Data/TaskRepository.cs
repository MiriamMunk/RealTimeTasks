using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealTimeTasks.Data
{
    public class TaskRepository
    {
        private readonly string _ConnStr;
        public TaskRepository(string ConnStr)
        {
            _ConnStr = ConnStr;
        }
        public User GetByEmail(string email)
        {
            using var ctx = new UserDataContext(_ConnStr);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddTask(Task task)
        {
            UserDataContext ctx = new(_ConnStr);
            ctx.Tasks.Add(task);
            ctx.SaveChanges();
        }
        public List<Task> GetTasks()
        {
            UserDataContext ctx = new(_ConnStr);
            return ctx.Tasks.Include(u => u.User).ToList();
        }
        public void StartTask(Task task, User user)
        {
            UserDataContext ctx = new(_ConnStr);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE tasks SET userId = {user.Id} WHERE Id ={task.Id}");
            ctx.SaveChanges();
        }
        public void DeleteTask(Task task)
        {
            UserDataContext ctx = new(_ConnStr);
            ctx.Database.ExecuteSqlInterpolated($"DELETE from tasks WHERE Id ={task.Id}");
            ctx.SaveChanges();
        }
    }
}
