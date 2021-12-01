# Generated by Django 3.2.9 on 2021-12-01 15:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0006_alter_product_description'),
        ('user', '0003_alter_seller_joindate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.customer')),
                ('productSpec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productspec')),
            ],
        ),
    ]
