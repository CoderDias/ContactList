using ContactList.Domain.Entities;
using FluentValidation;

namespace ContactList.Domain.Validators
{
    public class ContactValidator : AbstractValidator<Contact>
    {
        public ContactValidator() 
        { 
            RuleFor(contact => contact.Name).NotEmpty().MaximumLength(50);
            RuleFor(contact => contact.Email).NotEmpty().EmailAddress();
            RuleFor(contact => contact.Phone).NotEmpty().MaximumLength(15);
        }
    }
}
