
from . import views
from django.urls import path
# from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',views.index,name='index'),
    # path('rooms/',views.rooms,name='rooms'),
    path('login/',views.user_login,name='login'),
    path('signup/',views.user_signup,name='signup'),
    path('logout/',views.user_logout,name='logout'),
    path('password-reset/',views.password_reset,name='password-reset'),
    path('check_email/',views.check_email,name='check_email'),
    path('check_username/',views.check_username,name='check_username'),
    path('generate_otp/',views.generate_otp,name='generate_otp'),
    path('check_otp/',views.check_otp,name='check_otp'),
    path('news/',views.news,name='news'),



    

]



    



