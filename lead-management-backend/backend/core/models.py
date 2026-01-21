from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('AGENT', 'Agent'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)


class Lead(models.Model):
    STATUS_CHOICES = (
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Converted', 'Converted'),
        ('Rejected', 'Rejected'),
    )

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='New'
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="leads"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("STATUS_CHANGE", "Status Change"),
    ]

    actor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="performed_actions"
    )

    entity_type = models.CharField(max_length=50)  # User / Lead
    entity_id = models.IntegerField()

    action = models.CharField(max_length=20, choices=ACTION_CHOICES)

    old_value = models.JSONField(null=True, blank=True)
    new_value = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.actor} {self.action} {self.entity_type} {self.entity_id}"
