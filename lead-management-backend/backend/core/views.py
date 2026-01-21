from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Lead,User
from .serializers import LeadSerializer
from rest_framework.permissions import IsAuthenticated
from core.models import User
from core.serializers import UserSerializer
from core.models import AuditLog
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def agent_leads(request):
    user = request.user  # ← from JWT
    leads = Lead.objects.filter(assigned_to=user)
    serializer = LeadSerializer(leads, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_lead_status(request, lead_id):
    lead = Lead.objects.get(id=lead_id, assigned_to=request.user)
    lead.status = request.data.get('status')
    lead.save()
    serializer = LeadSerializer(lead)
    old_status = lead.status

    lead.status = request.data.get("status")
    lead.save()

    AuditLog.objects.create(
        actor=request.user,
        entity_type="Lead",
        entity_id=lead.id,
        action="STATUS_CHANGE",
        old_value={"status": old_status},
        new_value={"status": lead.status}
    )

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard_stats(request):
    user = request.user

    # Optional: restrict only admins
    if user.role != "ADMIN":
        return Response({"detail": "Unauthorized"}, status=403)

    total_leads = Lead.objects.count()
    converted_leads = Lead.objects.filter(status="Converted").count()
    active_agents = User.objects.filter(role="AGENT", is_active=True).count()

    conversion_rate = 0
    if total_leads > 0:
        conversion_rate = round((converted_leads / total_leads) * 100, 2)

    return Response({
        "totalLeads": total_leads,
        "convertedLeads": converted_leads,
        "activeAgents": active_agents,
        "conversionRate": conversion_rate
    })



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_users(request):
    if request.user.role != "ADMIN":
        return Response({"detail": "Unauthorized"}, status=403)

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user(request):
    if request.user.role != "ADMIN":
        return Response({"detail": "Unauthorized"}, status=403)

    data = request.data

    user = User.objects.create(
        username=data["username"],
        email=data.get("email", ""),
        role=data["role"],
        is_active=True
    )
    user.set_password(data["password"])
    user.save()

    return Response({"message": "User created successfully"})

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_user_status(request, user_id):
    if request.user.role != "ADMIN":
        return Response({"detail": "Unauthorized"}, status=403)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)
    old_status = user.is_active

    user.is_active = not user.is_active
    user.save()
    AuditLog.objects.create(
    actor=request.user,
    entity_type="User",
    entity_id=user.id,
    action="STATUS_CHANGE",
    old_value={"is_active": old_status},
    new_value={"is_active": user.is_active}
    )
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active
    })
