/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import { Badge, Box, H3, H4, H5, Icon, Tab, Tabs, Text } from '@adminjs/design-system';
import { ActionProps } from 'adminjs';
import React from 'react';

interface PhotoData {
  id: string;
  userId: number;
  s3Key: string;
  createdAt: string;
  position: number;
  uploadedById: number;
}

interface UserData {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  email_is_verified?: boolean;
  createdAt: string;
  updatedAt: string;
  birthdate?: string;
  city?: string;
  education?: string;
  education_place?: string;
  gender?: string;
  annual_income?: number | null;
  employer?: string;
  income_source?: string[] | string;
  job_about?: string | null;
  profession?: string;
  about?: string | null;
  status: string;
  photos?: PhotoData[];
  // Missing fields from Prisma schema
  first_date?: string;
  day_look?: string;
  has_children?: boolean | null;
  partner_children?: string;
  wants_children?: string;
  looks_more_personality?: number | null;
  independence_partner?: number | null;
  religion_alignment?: number | null;
  interests?: string[] | string;
  fact_about_me?: string;
  skip_linkedIn?: boolean;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

const formatValue = (value: unknown): string => {
  if (value === null) return 'NULL';
  if (value === undefined) return 'NULL';
  if (value === '') return 'Empty';
  return String(value);
};

const getStatusVariant = (status: string): 'primary' | 'success' | 'warning' | 'danger' => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'NEW':
    case 'WAITING_PREMODERATION':
    case 'WAITING_APPROVE':
      return 'warning';
    case 'DECLINED':
    case 'BANNED':
      return 'danger';
    default:
      return 'primary';
  }
};

const UserInfoTab: React.FC<{ userData: UserData }> = ({ userData }) => (
  <Box variant="card" padding="xl">
    <Box marginBottom="lg">
      <H3>{userData.name}</H3>
      <Box display="flex" alignItems="center" marginTop="sm">
        <Badge variant={getStatusVariant(userData.status)}>{userData.status}</Badge>
        {userData.email_is_verified && (
          <Badge variant="success" marginLeft="sm">
            Email Verified
          </Badge>
        )}
      </Box>
    </Box>

    <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <Box>
        <H4 marginBottom="md">Contact Information</H4>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Email:
          </Text>
          <Text>{userData.email}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Phone:
          </Text>
          <Text>{formatValue(userData.phone)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            City:
          </Text>
          <Text>{formatValue(userData.city)}</Text>
        </Box>
      </Box>

      <Box>
        <H4 marginBottom="md">Personal Information</H4>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Birth Date:
          </Text>
          <Text>{userData.birthdate ? formatDate(userData.birthdate) : 'NULL'}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Gender:
          </Text>
          <Text>{formatValue(userData.gender)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Education:
          </Text>
          <Text>{formatValue(userData.education)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Education Place:
          </Text>
          <Text>{formatValue(userData.education_place)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            About:
          </Text>
          <Text>{formatValue(userData.about)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Fact About Me:
          </Text>
          <Text>{formatValue(userData.fact_about_me)}</Text>
        </Box>
        <Box marginBottom="sm">
          <Text variant="sm" color="textSubtle">
            Interests:
          </Text>
          <Text>
            {Array.isArray(userData.interests)
              ? userData.interests.join(', ') || 'NULL'
              : formatValue(userData.interests)}
          </Text>
        </Box>
      </Box>
    </Box>

    <Box marginTop="lg">
      <H4 marginBottom="md">Professional Information</H4>
      <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Profession:
            </Text>
            <Text>{formatValue(userData.profession)}</Text>
          </Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Employer:
            </Text>
            <Text>{formatValue(userData.employer)}</Text>
          </Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Job About:
            </Text>
            <Text>{formatValue(userData.job_about)}</Text>
          </Box>
        </Box>
        <Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Income Source:
            </Text>
            <Text>
              {Array.isArray(userData.income_source)
                ? userData.income_source.join(', ') || 'NULL'
                : formatValue(userData.income_source)}
            </Text>
          </Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Annual Income:
            </Text>
            <Text>
              {userData.annual_income !== null && userData.annual_income !== undefined
                ? `${userData.annual_income.toLocaleString()} USD`
                : 'NULL'}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box marginTop="lg">
      <H4 marginBottom="md">System Information</H4>
      <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              ID:
            </Text>
            <Text>{userData.id}</Text>
          </Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Registration Date:
            </Text>
            <Text>{formatDate(userData.createdAt)}</Text>
          </Box>
        </Box>
        <Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Last Update:
            </Text>
            <Text>{formatDate(userData.updatedAt)}</Text>
          </Box>
          <Box marginBottom="sm">
            <Text variant="sm" color="textSubtle">
              Skip LinkedIn:
            </Text>
            <Text>{userData.skip_linkedIn === undefined ? 'NULL' : userData.skip_linkedIn ? 'Yes' : 'No'}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

const PhotosTab: React.FC<{ photos: PhotoData[] }> = ({ photos }) => {
  const s3BaseUrl = process.env.S3_BASE_URL || 'https://thegentsdevelop.s3.eu-north-1.amazonaws.com';

  if (!photos || photos.length === 0) {
    return (
      <Box variant="card" padding="xl" textAlign="center">
        <Icon icon="Image" size="xl" color="grey60" marginBottom="md" />
        <H5 marginBottom="sm">No Photos</H5>
        <Text color="textSubtle">This user has not uploaded any photos yet</Text>
      </Box>
    );
  }

  return (
    <Box variant="card" padding="xl">
      <Box marginBottom="lg">
        <H4>Photos ({photos.length})</H4>
      </Box>

      <Box
        display="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {photos
          .sort((a, b) => a.position - b.position)
          .map((photo) => {
            const imageUrl = `${s3BaseUrl}/${photo.s3Key}`;
            return (
              <Box key={photo.id} variant="container" borderRadius="lg" overflow="hidden" style={{ aspectRatio: '1' }}>
                <Box
                  as="img"
                  src={imageUrl}
                  alt={`Photo ${photo.position}`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => window.open(imageUrl, '_blank')}
                />
                <Box padding="sm">
                  <Text variant="xs" color="textSubtle">
                    Position: {photo.position}
                  </Text>
                  <Text variant="xs" color="textSubtle">
                    {formatDate(photo.createdAt)}
                  </Text>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

function MyCustomAction(props: ActionProps) {
  const { record } = props;
  const [selectedTab, setSelectedTab] = React.useState('info');

  const userData = record.params as UserData;
  const photos = userData.photos || [];

  return (
    <Tabs currentTab={selectedTab} onChange={setSelectedTab}>
      <Tab id="info" label="Information">
        <UserInfoTab userData={userData} />
      </Tab>
      <Tab id="photos" label={`Photos (${photos.length})`}>
        <PhotosTab photos={photos} />
      </Tab>
    </Tabs>
  );
}

export default MyCustomAction;
