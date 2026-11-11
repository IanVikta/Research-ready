<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * Verify the API root returns a JSON status payload.
     */
    public function test_the_api_root_returns_a_successful_json_response(): void
    {
        $response = $this->getJson('/');

        $response->assertStatus(200)
            ->assertJson([
                'service' => 'Expert Research Ready Services — REST API',
                'version' => 'v1',
                'status' => 'operational',
            ]);
    }
}
