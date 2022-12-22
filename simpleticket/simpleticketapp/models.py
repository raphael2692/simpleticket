from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ticket(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=1000)
    creationDate = models.DateTimeField()
    dueDate = models.DateTimeField()
    createdBy = models.ForeignKey(User, related_name="createdBys", related_query_name="createdBy", on_delete=models.CASCADE)
    requestedBy = models.ForeignKey(User, related_name="requestedBys", related_query_name="requestedBy", on_delete=models.CASCADE)
    requestedFor = models.ForeignKey(User, related_name="requestedFors", related_query_name="requestedFor", on_delete=models.CASCADE)
    completed = models.BooleanField()
    
