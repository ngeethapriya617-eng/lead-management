from django.urls import path
from .views import agent_leads, create_user, update_lead_status, admin_dashboard_stats, admin_users,toggle_user_status,admin_audit_logs
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('agent/leads/', agent_leads),
    path('leads/<int:lead_id>/status/', update_lead_status),
    path("admin/dashboard/", admin_dashboard_stats),
    path("admin/users/", admin_users),
    path("admin/users/create/", create_user),
    path("admin/users/<int:user_id>/toggle/", toggle_user_status),
    path("admin/audit-logs/", admin_audit_logs),
    path("token/refresh/", TokenRefreshView.as_view()),

]
