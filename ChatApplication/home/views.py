from django.shortcuts import render, redirect
from django.http import JsonResponse,HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .forms import  LoginForm,SignupForm
import json
import secrets


# Create your views here.
# Home page
def index(request):
    return render(request, 'home.html')

# signup page


# dummy_user_data = {
#    'user1':{
#         'username': 'ahammed',
#         'email': 'ahammedshaik0301@gmail.com',
#         'password1': 'Yerraguntla@2001'},
#    'user2':{'username' :'akmal',
#             'email': 'akmal@gmail.com',
#          'password1': 'Yerraguntla@2001'},
#           'user3':{'username' :'toufiq',
#             'email': 'toufiq@gmail.com',
#          'password1': 'Yerraguntla@2001'},
         
#      }


def user_signup(request):
    if request.method == 'POST':

        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = SignupForm()
    return render(request, 'sign_up.html', {'form': form})

# login page
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)   
                return redirect('/')
            else:
                # Add a message for invalid login details
                messages.error(request, 'Invalid login details. Please try again.')
            
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

# logout page
def user_logout(request):
    logout(request)
    return redirect('/')

def password_reset(request):
    if request.method=='POST':
        print(True)
        email=request.POST.get('email')
        user = User.objects.get(email=email)
        print(user)
        password=request.POST.get('new_password')
        user.set_password(password)
        user.save()
        return HttpResponse("Sucess")
    
    
    
    return render(request,'password-reset.html')



def check_username(request):
    if request.method =='GET':
        username=request.GET.get('username')
        user = User.objects.filter(username=username).exists()
        return JsonResponse({'exists': user})


def check_email(request):
    if request.method =='GET':
        email=request.GET.get('email')
        user = User.objects.filter(email=email).exists()
        return JsonResponse({'exists': user})
    
otp = ""
    
def generate_otp(request):
    if request.method=='POST':
        global otp
        otp="".join(secrets.choice('0123456789') for _ in range(5))
        data=request.body.decode('utf-8')
        json_data=json.loads(data)
        email=json_data.get('key')
        # print(email)
        print(otp)
        return JsonResponse({'otp_generated':True})
    
    else:
        return JsonResponse({'otp_generated':False})



def check_otp(request):
    if request.method=='POST':
        # print("VALIDATE OTP")
        data = request.body.decode('utf-8')
        json_data=json.loads(data)
        user_otp=json_data.get('key')
        global otp
        matched=(user_otp==otp)
        print(user_otp,otp)
        return JsonResponse({'matched':matched})
    else:
        return JsonResponse({'matched':matched})



        