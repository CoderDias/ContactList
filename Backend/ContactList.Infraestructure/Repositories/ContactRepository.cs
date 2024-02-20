using ContactList.Domain.Entities;
using ContactList.Domain.Services;
using ContactList.Domain.Validators;
using ContactList.Infraestructure.Database;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ContactList.Infraestructure.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly ContactValidator _validator;
        public ContactRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _validator = new();
        }

        public async Task<Contact> GetByIdAsync(int id)
        {
            return await _dbContext.Set<Contact>().FindAsync(id);
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await _dbContext.Set<Contact>().ToListAsync();
        }

        public async Task CreateAsync(Contact contact)
        {
            await _validator.ValidateAndThrowAsync(contact);
            await _dbContext.Set<Contact>().AddAsync(contact);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Contact contact)
        {
            await _validator.ValidateAndThrowAsync(contact);
            _dbContext.Entry(contact).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var contact = await _dbContext.Set<Contact>().FindAsync(id);
            if (contact != null)
            {
                _dbContext.Set<Contact>().Remove(contact);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
