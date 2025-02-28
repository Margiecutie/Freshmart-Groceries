from django.shortcuts import render
from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from .utils import send_event_to_esb

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def perform_create(self, serializer):
        employee = serializer.save()
        send_event_to_esb("employee_created", {
            "id": employee.id,
            "name": f"{employee.first_name} {employee.last_name}",
            "email": employee.email,
            "position": employee.position
        })
