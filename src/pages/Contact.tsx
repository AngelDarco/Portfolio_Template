export default function Contact() {
  const contactInfo = {
    name: "John Doe",
    email: "5iR0E@example.com",
    phone: "+1 (123) 456-7890",
    address: "123 Main Street, Anytown, USA",
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-center pt-16 text-white">
      <h1 className="text-3xl font-bold">Contact Me</h1>
      <p>If you’d like to get in touch, here’s how to reach me:</p>

      <section className="contact-info">
        <h2>Contact Information</h2>
        <ul>
          <li>
            <strong>Name:</strong> {contactInfo.name}
          </li>
          <li>
            <strong>Email:</strong>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </li>
          <li>
            <strong>Phone:</strong>
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </li>
          <li>
            <strong>Address:</strong> {contactInfo.address}
          </li>
          <li>
            <strong>GitHub:</strong>
            <a href="https://github.com/yourusername" target="_blank">
              https://github.com/yourusername
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>
            <a href="https://linkedin.com/in/yourusername" target="_blank">
              https://linkedin.com/in/yourusername
            </a>
          </li>
          <li>
            <strong>Twitter:</strong>
            <a href="https://twitter.com/yourusername" target="_blank">
              https://twitter.com/yourusername
            </a>
          </li>
          <li>
            <strong>Instagram:</strong>
            <a href="https://instagram.com/yourusername" target="_blank">
              https://instagram.com/yourusername
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
/*
<style>
  .contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .contact-info {
    margin-top: 20px;
  }

  .contact-info ul {
    list-style-type: none;
    padding: 0;
  }

  .contact-info li {
    margin-bottom: 10px;
  }

  .contact-info a {
    color: #007acc;
    text-decoration: none;
  }
</style>
*/
