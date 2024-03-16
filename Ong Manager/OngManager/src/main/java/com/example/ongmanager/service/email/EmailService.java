package com.example.ongmanager.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final String supportEmail;

    public EmailService(JavaMailSender mailSender,
                        @Value("${app.email.support}") String supportEmail) {
        this.mailSender = mailSender;
        this.supportEmail = supportEmail;

    }

    public void sendEmailWithTemplate(String emailTo,String subject,String content) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom(supportEmail);
            mimeMessageHelper.setTo(emailTo);
            mimeMessageHelper.setText(content, true);
            mimeMessageHelper.addInline("ong-manager-image", new ClassPathResource("ong-manager.png"));

            mailSender.send(mimeMessageHelper.getMimeMessage());

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}



