from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Room, Message
from django.urls import reverse


# Create your views here.
@login_required
def rooms(request):
    rooms_list=Room.objects.all()
    if request.method=='POST':
        room_slug=request.POST.get('room_name')
        exists=Room.objects.filter(slug=room_slug).exists()
        if exists:
            return redirect(reverse('room', kwargs={'slug': room_slug}))
        else:
            messages.error(request,"Room Not exists")

    return render(request,'rooms.html',{'rooms':rooms_list})

@login_required
def room(request, slug):
    room = Room.objects.get(slug=slug)
    messages = Message.objects.filter(room=room)
    room_list=Room.objects.all()
    return render(request, 'message-box.html', {'room': room, 'messages': messages,'rooms':room_list})