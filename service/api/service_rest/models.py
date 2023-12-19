from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=350)
    status = models.CharField(max_length=100)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name='appointments',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.customer}: {self.reason}"
