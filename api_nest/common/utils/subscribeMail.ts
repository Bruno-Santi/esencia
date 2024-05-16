export const subscribeMail = (subjectMail) => {
  const data = {
    to: `${process.env.SENDGRID_EMAIL}`,
    subject: `Nuevo interesado`,
    from: `${process.env.SENDGRID_EMAIL}`,
    html: `<html>Un nuevo interesado ha aparecido. 
    Su correo es ${subjectMail}</html>`,
  };
  return data;
};
