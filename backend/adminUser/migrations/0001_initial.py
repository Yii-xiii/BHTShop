# Generated by Django 3.2.9 on 2021-12-03 09:17

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminUser',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(choices=[('scam', 'scam'), ('selling prohibited item', 'selling prohibited item'), ('sending offensive messages', 'sending offensive messages'), ('counterfeit', 'counterfeit'), ('others', 'others')], max_length=50)),
                ('description', models.TextField(blank=True)),
                ('reportedUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReportedUser', to=settings.AUTH_USER_MODEL)),
                ('reportingUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ReportingUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
