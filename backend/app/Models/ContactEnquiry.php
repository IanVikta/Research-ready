<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactEnquiry extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'contact_enquiries';

    /**
     * Allowed service values for academic consultation enquiries.
     *
     * @var array<int, string>
     */
    public const ALLOWED_SERVICES = [
        'Academic Research Assistance',
        'Thesis and Dissertation Assistance',
        'Research Proposal Writing',
        'Literature Review and Data Analysis',
        'Other',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'service',
        'message',
        'status',
    ];

    /**
     * Default attribute values.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'status' => 'new',
    ];
}

